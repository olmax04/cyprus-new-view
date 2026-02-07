import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const seeds = {
    en: {
      heading: 'About Our Company',
      subheading: 'Who We Are',
      description:
        'We are a leading real estate agency in Cyprus, specializing in luxury properties. With over 10 years of experience, we help our clients find their dream homes and make profitable investments in the Mediterranean paradise.',
      features: [
        {
          title: 'Expert Consultation',
          description:
            'Our team of experienced professionals provides personalized guidance throughout your property journey.',
          icon: 'Users',
        },
        {
          title: 'Prime Locations',
          description:
            'We offer exclusive access to the most sought-after locations across Cyprus.',
          icon: 'MapPin',
        },
        {
          title: 'Investment Returns',
          description:
            'Our properties deliver consistent returns and long-term value appreciation.',
          icon: 'TrendingUp',
        },
        {
          title: 'Legal Support',
          description:
            'Complete legal assistance and documentation support for a smooth transaction.',
          icon: 'Shield',
        },
        {
          title: 'After-Sales Service',
          description:
            'Comprehensive property management and maintenance services after purchase.',
          icon: 'Wrench',
        },
        {
          title: 'Trusted Partner',
          description:
            'Certified agency with a proven track record and hundreds of satisfied clients.',
          icon: 'Award',
        },
      ],
      stats: [
        { value: '500+', label: 'Properties Sold' },
        { value: '10+', label: 'Years Experience' },
        { value: '98%', label: 'Client Satisfaction' },
      ],
      buttonLabel: 'Learn More',
    },
    ru: {
      heading: 'О нашей компании',
      subheading: 'Кто мы',
      description:
        'Мы — ведущее агентство недвижимости на Кипре, специализирующееся на элитной недвижимости. Более 10 лет опыта помогают нашим клиентам находить дома мечты и совершать выгодные инвестиции в средиземноморском раю.',
      features: [
        {
          title: 'Экспертная консультация',
          description:
            'Наша команда опытных профессионалов предоставляет персональное сопровождение на всех этапах.',
          icon: 'Users',
        },
        {
          title: 'Лучшие локации',
          description:
            'Мы предлагаем эксклюзивный доступ к самым востребованным местам на Кипре.',
          icon: 'MapPin',
        },
        {
          title: 'Инвестиционная доходность',
          description:
            'Наша недвижимость обеспечивает стабильную доходность и долгосрочный рост стоимости.',
          icon: 'TrendingUp',
        },
        {
          title: 'Юридическая поддержка',
          description:
            'Полная юридическая помощь и поддержка документации для безопасной сделки.',
          icon: 'Shield',
        },
        {
          title: 'Послепродажный сервис',
          description:
            'Комплексное управление недвижимостью и техническое обслуживание после покупки.',
          icon: 'Wrench',
        },
        {
          title: 'Надежный партнер',
          description:
            'Сертифицированное агентство с проверенной репутацией и сотнями довольных клиентов.',
          icon: 'Award',
        },
      ],
      stats: [
        { value: '500+', label: 'Продано объектов' },
        { value: '10+', label: 'Лет опыта' },
        { value: '98%', label: 'Довольных клиентов' },
      ],
      buttonLabel: 'Узнать больше',
    },
    sk: {
      heading: 'O našej spoločnosti',
      subheading: 'Kto sme',
      description:
        'Sme popredná realitná agentúra na Cypre, špecializujúca sa na luxusné nehnuteľnosti. S viac ako 10-ročnými skúsenosťami pomáhame našim klientom nájsť ich vysnívaný domov a urobiť výhodné investície v stredomorskom raji.',
      features: [
        {
          title: 'Odborné poradenstvo',
          description:
            'Náš tím skúsených profesionálov poskytuje personalizované vedenie počas celej cesty.',
          icon: 'Users',
        },
        {
          title: 'Prémiové lokality',
          description:
            'Ponúkame exkluzívny prístup k najvyhľadávanejším lokalitám na Cypre.',
          icon: 'MapPin',
        },
        {
          title: 'Investičné výnosy',
          description:
            'Naše nehnuteľnosti prinášajú konzistentné výnosy a dlhodobý rast hodnoty.',
          icon: 'TrendingUp',
        },
        {
          title: 'Právna podpora',
          description:
            'Kompletná právna pomoc a podpora dokumentácie pre plynulú transakciu.',
          icon: 'Shield',
        },
        {
          title: 'Popredajný servis',
          description:
            'Komplexná správa nehnuteľností a údržbové služby po kúpe.',
          icon: 'Wrench',
        },
        {
          title: 'Dôveryhodný partner',
          description:
            'Certifikovaná agentúra s osvedčenou históriou a stovkami spokojných klientov.',
          icon: 'Award',
        },
      ],
      stats: [
        { value: '500+', label: 'Predaných nehnuteľností' },
        { value: '10+', label: 'Rokov skúseností' },
        { value: '98%', label: 'Spokojných klientov' },
      ],
      buttonLabel: 'Dozvedieť sa viac',
    },
  } as const

  // Create or update about-us global for each locale
  for (const [locale, data] of Object.entries(seeds)) {
    await payload.updateGlobal({
      slug: 'about-us',
      req,
      locale: locale as 'en' | 'ru' | 'sk',
      data,
    })
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // Reset to default empty state
  const emptyData = {
    heading: '',
    subheading: '',
    description: '',
    features: [],
    stats: [],
    buttonLabel: '',
  }

  for (const locale of ['en', 'ru', 'sk']) {
    await payload.updateGlobal({
      slug: 'about-us',
      req,
      locale: locale as 'en' | 'ru' | 'sk',
      data: emptyData,
    })
  }
}
