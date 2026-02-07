import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const seeds = {
    en: {
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
        cities: [{ label: 'Limassol' }, { label: 'Paphos' }, { label: 'Larnaca' }, { label: 'Nicosia' }],
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
    ru: {
      nav: {
        aboutLabel: 'О нас',
        faqLabel: 'Вопросы',
        contactLabel: 'Контакты',
        whatsappLabel: 'WhatsApp',
        whatsappUrl: 'https://wa.me/35700000000',
      },
      title: { line1: 'КИПР', line2: 'НЕДВИЖИМОСТЬ', line3: 'ПРЕМИУМ' },
      stats: [
        { value: '150+', label: 'Объектов' },
        { value: '10 лет', label: 'На рынке' },
        { value: '12% ROI', label: 'Средняя' },
      ],
      categories: [
        { label: 'Люксовые виллы' },
        { label: 'Апартаменты у моря' },
        { label: 'Инвестиции' },
      ],
      buttons: {
        primaryLabel: 'Смотреть',
        secondaryLabel: 'Видео',
        searchLabel: 'Найти',
      },
      search: {
        cityLabel: 'Город',
        propertyLabel: 'Тип недвижимости',
        budgetLabel: 'Бюджет',
        cities: [
          { label: 'Лимассол' },
          { label: 'Пафос' },
          { label: 'Ларнака' },
          { label: 'Никосия' },
        ],
        propertyTypes: [
          { label: 'Вилла' },
          { label: 'Апартаменты' },
          { label: 'Пентхаус' },
          { label: 'Земля' },
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
    sk: {
      nav: {
        aboutLabel: 'O nás',
        faqLabel: 'FAQ',
        contactLabel: 'Kontakt',
        whatsappLabel: 'WhatsApp',
        whatsappUrl: 'https://wa.me/35700000000',
      },
      title: { line1: 'CYPRUS', line2: 'REAL', line3: 'ESTATE' },
      stats: [
        { value: '150+', label: 'Ponuky' },
        { value: '10 rokov', label: 'Na trhu' },
        { value: '12% ROI', label: 'Priemer' },
      ],
      categories: [
        { label: 'Luxusné vily' },
        { label: 'Byty pri mori' },
        { label: 'Investície' },
      ],
      buttons: {
        primaryLabel: 'Preskúmať',
        secondaryLabel: 'Pozrieť video',
        searchLabel: 'Hľadať',
      },
      search: {
        cityLabel: 'Mesto',
        propertyLabel: 'Typ nehnuteľnosti',
        budgetLabel: 'Rozpočet',
        cities: [
          { label: 'Limassol' },
          { label: 'Paphos' },
          { label: 'Larnaka' },
          { label: 'Nicosia' },
        ],
        propertyTypes: [
          { label: 'Vila' },
          { label: 'Apartmán' },
          { label: 'Penthouse' },
          { label: 'Pozemok' },
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
  }

  // Create or update hero global for each locale
  for (const [locale, data] of Object.entries(seeds)) {
    await payload.updateGlobal({
      slug: 'hero',
      req,
      locale: locale as 'en' | 'ru' | 'sk',
      data,
    })
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // Reset to default empty state
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
