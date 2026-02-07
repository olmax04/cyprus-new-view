import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // English
  await payload.updateGlobal({
    slug: 'footer',
    locale: 'en',
    data: {
      logo: 'Cyprus Real Estate',
      description: 'Your trusted partner in finding the perfect property in Cyprus. Premium real estate solutions with personalized service.',
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

  // Russian
  await payload.updateGlobal({
    slug: 'footer',
    locale: 'ru',
    data: {
      logo: 'Cyprus Real Estate',
      description: 'Ваш надежный партнер в поиске идеальной недвижимости на Кипре. Премиальные решения с персональным обслуживанием.',
      columns: [
        {
          title: 'Недвижимость',
          links: [
            { label: 'Виллы', url: '/properties/villas' },
            { label: 'Апартаменты', url: '/properties/apartments' },
            { label: 'Коммерческая', url: '/properties/commercial' },
            { label: 'Земля', url: '/properties/land' },
          ],
        },
        {
          title: 'Услуги',
          links: [
            { label: 'Управление недвижимостью', url: '/services/management' },
            { label: 'Юридическая поддержка', url: '/services/legal' },
            { label: 'Инвестиционный консалтинг', url: '/services/investment' },
            { label: 'Релокация', url: '/services/relocation' },
          ],
        },
        {
          title: 'Компания',
          links: [
            { label: 'О нас', url: '/about' },
            { label: 'Наша команда', url: '/team' },
            { label: 'Блог', url: '/blog' },
            { label: 'Контакты', url: '/contact' },
          ],
        },
      ],
      contact: {
        title: 'Связаться с нами',
        phone: '+357 25 123 456',
        email: 'info@cyprusrealestate.com',
        address: 'Лимассол, Кипр\nПроспект 28 Октября, 3035',
      },
      social: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
      ],
      copyright: '© 2026 Cyprus Real Estate. Все права защищены.',
    },
  })

  // Slovak
  await payload.updateGlobal({
    slug: 'footer',
    locale: 'sk',
    data: {
      logo: 'Cyprus Real Estate',
      description: 'Váš dôveryhodný partner pri hľadaní dokonalej nehnuteľnosti na Cypre. Prémiové riešenia s personalizovanou službou.',
      columns: [
        {
          title: 'Nehnuteľnosti',
          links: [
            { label: 'Vily', url: '/properties/villas' },
            { label: 'Apartmány', url: '/properties/apartments' },
            { label: 'Komerčné', url: '/properties/commercial' },
            { label: 'Pozemky', url: '/properties/land' },
          ],
        },
        {
          title: 'Služby',
          links: [
            { label: 'Správa nehnuteľností', url: '/services/management' },
            { label: 'Právna podpora', url: '/services/legal' },
            { label: 'Investičné poradenstvo', url: '/services/investment' },
            { label: 'Relokácia', url: '/services/relocation' },
          ],
        },
        {
          title: 'Spoločnosť',
          links: [
            { label: 'O nás', url: '/about' },
            { label: 'Náš tím', url: '/team' },
            { label: 'Blog', url: '/blog' },
            { label: 'Kontakt', url: '/contact' },
          ],
        },
      ],
      contact: {
        title: 'Kontaktujte nás',
        phone: '+357 25 123 456',
        email: 'info@cyprusrealestate.com',
        address: 'Limassol, Cyprus\n28 Oktovriou Avenue, 3035',
      },
      social: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
      ],
      copyright: '© 2026 Cyprus Real Estate. Všetky práva vyhradené.',
    },
  })
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.updateGlobal({
    slug: 'footer',
    locale: 'en',
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

  await payload.updateGlobal({
    slug: 'footer',
    locale: 'ru',
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

  await payload.updateGlobal({
    slug: 'footer',
    locale: 'sk',
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
