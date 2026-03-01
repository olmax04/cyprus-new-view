import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // Step 1: Seed the default locale (en) first — this creates the global and all array items
  await payload.updateGlobal({
    slug: 'footer',
    req,
    locale: 'en',
    data: {
      logo: 'Cyprus Real Estate',
      description:
        'Your trusted partner in finding the perfect property in Cyprus. Premium real estate solutions with personalized service.',
      columns: [
        {
          title: 'Properties',
          links: [
            { label: 'Villas', url: '/properties/villas' },
            { label: 'Apartments', url: '/properties/apartments' },
            { label: 'Commercial', url: '/properties/commercial' },
            { label: 'Land', url: '/properties/land' },
          ],
        },
        {
          title: 'Services',
          links: [
            { label: 'Property Management', url: '/services/management' },
            { label: 'Legal Support', url: '/services/legal' },
            { label: 'Investment Consulting', url: '/services/investment' },
            { label: 'Relocation', url: '/services/relocation' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'About Us', url: '/about' },
            { label: 'Our Team', url: '/team' },
            { label: 'Blog', url: '/blog' },
            { label: 'Contact', url: '/contact' },
          ],
        },
      ],
      contact: {
        title: 'Contact Us',
        phone: '+357 25 123 456',
        email: 'info@cyprusrealestate.com',
        address: 'Limassol, Cyprus\n28 Oktovriou Avenue, 3035',
      },
      social: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
      ],
      copyright: '© 2026 Cyprus Real Estate. All rights reserved.',
    },
  })

  // Step 2: Read the global back to get the auto-generated IDs of array items
  const footer = await payload.findGlobal({
    slug: 'footer',
    req,
    locale: 'en',
  })

  // Build the columns array with existing IDs so Payload updates in-place
  // instead of deleting and recreating array items (which would lose EN localized data)
  const ruColumns = footer.columns.map((col: any, i: number) => ({
    id: col.id,
    title: ['Недвижимость', 'Услуги', 'Компания'][i],
    links: col.links.map((link: any, j: number) => ({
      id: link.id,
      label: [
        ['Виллы', 'Апартаменты', 'Коммерческая', 'Земля'],
        [
          'Управление недвижимостью',
          'Юридическая поддержка',
          'Инвестиционный консалтинг',
          'Релокация',
        ],
        ['О нас', 'Наша команда', 'Блог', 'Контакты'],
      ][i][j],
      url: link.url,
    })),
  }))

  const skColumns = footer.columns.map((col: any, i: number) => ({
    id: col.id,
    title: ['Nehnuteľnosti', 'Služby', 'Spoločnosť'][i],
    links: col.links.map((link: any, j: number) => ({
      id: link.id,
      label: [
        ['Vily', 'Apartmány', 'Komerčné', 'Pozemky'],
        ['Správa nehnuteľností', 'Právna podpora', 'Investičné poradenstvo', 'Relokácia'],
        ['O nás', 'Náš tím', 'Blog', 'Kontakt'],
      ][i][j],
      url: link.url,
    })),
  }))

  const socialWithIds = footer.social.map((s: any) => ({
    id: s.id,
    platform: s.platform,
    url: s.url,
  }))

  // Step 3: Update Russian locale — reuse existing array item IDs
  await payload.updateGlobal({
    slug: 'footer',
    req,
    locale: 'ru',
    data: {
      logo: 'Cyprus Real Estate',
      description:
        'Ваш надежный партнер в поиске идеальной недвижимости на Кипре. Премиальные решения с персональным обслуживанием.',
      columns: ruColumns,
      contact: {
        title: 'Связаться с нами',
        phone: '+357 25 123 456',
        email: 'info@cyprusrealestate.com',
        address: 'Лимассол, Кипр\nПроспект 28 Октября, 3035',
      },
      social: socialWithIds,
      copyright: '© 2026 Cyprus Real Estate. Все права защищены.',
    },
  })

  // Step 4: Update Slovak locale — reuse existing array item IDs
  await payload.updateGlobal({
    slug: 'footer',
    req,
    locale: 'sk',
    data: {
      logo: 'Cyprus Real Estate',
      description:
        'Váš dôveryhodný partner pri hľadaní dokonalej nehnuteľnosti na Cypre. Prémiové riešenia s personalizovanou službou.',
      columns: skColumns,
      contact: {
        title: 'Kontaktujte nás',
        phone: '+357 25 123 456',
        email: 'info@cyprusrealestate.com',
        address: 'Limassol, Cyprus\n28 Oktovriou Avenue, 3035',
      },
      social: socialWithIds,
      copyright: '© 2026 Cyprus Real Estate. Všetky práva vyhradené.',
    },
  })
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  for (const locale of ['en', 'ru', 'sk']) {
    await payload.updateGlobal({
      slug: 'footer',
      req,
      locale: locale as 'en' | 'ru' | 'sk',
      data: {
        logo: '',
        description: '',
        columns: [],
        contact: {
          title: '',
          phone: '',
          email: '',
          address: '',
        },
        social: [],
        copyright: '',
      },
    })
  }
}
