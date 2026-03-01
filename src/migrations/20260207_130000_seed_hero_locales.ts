import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // Step 1: Seed default locale (en) first — creates the global and all array items
  await payload.updateGlobal({
    slug: 'hero',
    req,
    locale: 'en',
    data: {
      nav: {
        aboutLabel: 'About Us',
        faqLabel: 'FAQ',
        contactLabel: 'Contact Us',
        whatsappLabel: 'WhatsApp',
        whatsappUrl: 'https://wa.me/35700000000',
      },
      title: { line1: 'CYPRUS', line2: 'REAL', line3: 'ESTATE' },
      stats: [
        { value: '150+', label: 'Listings' },
        { value: '10 Years', label: 'On Market' },
        { value: '12% ROI', label: 'Average' },
      ],
      categories: [
        { label: 'Luxury Villas' },
        { label: 'Seafront Apartments' },
        { label: 'Investments' },
      ],
      buttons: {
        primaryLabel: 'Explore',
        secondaryLabel: 'Watch Video',
        searchLabel: 'Find',
      },
      search: {
        cityLabel: 'City',
        propertyLabel: 'Property Type',
        budgetLabel: 'Budget',
        cities: [
          { label: 'Limassol' },
          { label: 'Paphos' },
          { label: 'Larnaca' },
          { label: 'Nicosia' },
        ],
        propertyTypes: [
          { label: 'Villa' },
          { label: 'Apartment' },
          { label: 'Penthouse' },
          { label: 'Land' },
        ],
        budgets: [
          { label: '€100k - €250k' },
          { label: '€250k - €500k' },
          { label: '€500k - €1M' },
          { label: '€1M+' },
        ],
      },
      galleryCards: [],
    },
  })

  // Step 2: Read the global back to get auto-generated IDs
  const hero = await payload.findGlobal({
    slug: 'hero',
    req,
    locale: 'en',
  })

  // Helper: map array items preserving IDs
  const mapWithIds = (items: any[], labels: string[]) =>
    items.map((item: any, i: number) => ({ id: item.id, label: labels[i] }))

  const mapWithIdsValueLabel = (items: any[], data: { value: string; label: string }[]) =>
    items.map((item: any, i: number) => ({ id: item.id, ...data[i] }))

  // Step 3: Update Russian locale — reuse existing array item IDs
  await payload.updateGlobal({
    slug: 'hero',
    req,
    locale: 'ru',
    data: {
      nav: {
        aboutLabel: 'О нас',
        faqLabel: 'Вопросы',
        contactLabel: 'Контакты',
        whatsappLabel: 'WhatsApp',
        whatsappUrl: 'https://wa.me/35700000000',
      },
      title: { line1: 'КИПР', line2: 'НЕДВИЖИМОСТЬ', line3: 'ПРЕМИУМ' },
      stats: mapWithIdsValueLabel(hero.stats || [], [
        { value: '150+', label: 'Объектов' },
        { value: '10 лет', label: 'На рынке' },
        { value: '12% ROI', label: 'Средняя' },
      ]),
      categories: mapWithIds(hero.categories || [], [
        'Люксовые виллы',
        'Апартаменты у моря',
        'Инвестиции',
      ]),
      buttons: {
        primaryLabel: 'Смотреть',
        secondaryLabel: 'Видео',
        searchLabel: 'Найти',
      },
      search: {
        cityLabel: 'Город',
        propertyLabel: 'Тип недвижимости',
        budgetLabel: 'Бюджет',
        cities: mapWithIds(hero.search?.cities || [], ['Лимассол', 'Пафос', 'Ларнака', 'Никосия']),
        propertyTypes: mapWithIds(hero.search?.propertyTypes || [], [
          'Вилла',
          'Апартаменты',
          'Пентхаус',
          'Земля',
        ]),
        budgets: mapWithIds(hero.search?.budgets || [], [
          '€100k - €250k',
          '€250k - €500k',
          '€500k - €1M',
          '€1M+',
        ]),
      },
      galleryCards: [],
    },
  })

  // Step 4: Update Slovak locale — reuse existing array item IDs
  await payload.updateGlobal({
    slug: 'hero',
    req,
    locale: 'sk',
    data: {
      nav: {
        aboutLabel: 'O nás',
        faqLabel: 'FAQ',
        contactLabel: 'Kontakt',
        whatsappLabel: 'WhatsApp',
        whatsappUrl: 'https://wa.me/35700000000',
      },
      title: { line1: 'CYPRUS', line2: 'REAL', line3: 'ESTATE' },
      stats: mapWithIdsValueLabel(hero.stats || [], [
        { value: '150+', label: 'Ponuky' },
        { value: '10 rokov', label: 'Na trhu' },
        { value: '12% ROI', label: 'Priemer' },
      ]),
      categories: mapWithIds(hero.categories || [], [
        'Luxusné vily',
        'Byty pri mori',
        'Investície',
      ]),
      buttons: {
        primaryLabel: 'Preskúmať',
        secondaryLabel: 'Pozrieť video',
        searchLabel: 'Hľadať',
      },
      search: {
        cityLabel: 'Mesto',
        propertyLabel: 'Typ nehnuteľnosti',
        budgetLabel: 'Rozpočet',
        cities: mapWithIds(hero.search?.cities || [], ['Limassol', 'Paphos', 'Larnaka', 'Nicosia']),
        propertyTypes: mapWithIds(hero.search?.propertyTypes || [], [
          'Vila',
          'Apartmán',
          'Penthouse',
          'Pozemok',
        ]),
        budgets: mapWithIds(hero.search?.budgets || [], [
          '€100k - €250k',
          '€250k - €500k',
          '€500k - €1M',
          '€1M+',
        ]),
      },
      galleryCards: [],
    },
  })
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  const emptyData = {
    nav: {
      aboutLabel: '',
      faqLabel: '',
      contactLabel: '',
      whatsappLabel: '',
      whatsappUrl: '',
    },
    title: { line1: '', line2: '', line3: '' },
    stats: [],
    categories: [],
    buttons: {
      primaryLabel: '',
      secondaryLabel: '',
      searchLabel: '',
    },
    search: {
      cityLabel: '',
      propertyLabel: '',
      budgetLabel: '',
      cities: [],
      propertyTypes: [],
      budgets: [],
    },
    galleryCards: [],
  }

  for (const locale of ['en', 'ru', 'sk']) {
    await payload.updateGlobal({
      slug: 'hero',
      req,
      locale: locale as 'en' | 'ru' | 'sk',
      data: emptyData,
    })
  }
}
