import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const seeds = {
    en: {
      heading: 'What Our Clients Say',
      subheading: 'Testimonials',
      items: [
        {
          name: 'Michael Anderson',
          role: 'CEO',
          country: 'United Kingdom',
          content:
            'Outstanding service from start to finish. The team helped us find the perfect villa in Limassol and handled all the legal paperwork seamlessly. Our investment has already appreciated by 15% in just two years.',
          rating: 5,
        },
        {
          name: 'Elena Petrova',
          role: 'Entrepreneur',
          country: 'Russia',
          content:
            'Профессиональный подход и внимание к деталям впечатлили с первой встречи. Нашли идеальную квартиру с видом на море. Полное сопровождение сделки и помощь в получении ВНЖ. Рекомендую всем!',
          rating: 5,
        },
        {
          name: 'Hans Schmidt',
          role: 'Investor',
          country: 'Germany',
          content:
            'I purchased three apartments for investment purposes. The team provided excellent market analysis and property management services. Rental yields exceeded my expectations. Highly professional agency.',
          rating: 5,
        },
        {
          name: 'Sophie Dubois',
          role: 'Architect',
          country: 'France',
          content:
            "Exceptional experience buying our retirement home in Paphos. They understood our needs perfectly and showed us only properties that matched our criteria. The after-sales support has been wonderful.",
          rating: 5,
        },
        {
          name: 'Dmitry Ivanov',
          role: 'Business Owner',
          country: 'Russia',
          content:
            'Купил виллу для семьи через это агентство. Прозрачность на всех этапах, честные цены, никаких скрытых комиссий. Помогли с оформлением всех документов. Через год купил еще одну недвижимость для сдачи в аренду.',
          rating: 5,
        },
        {
          name: 'James Wilson',
          role: 'Retired Executive',
          country: 'USA',
          content:
            'As an American buying overseas, I had many concerns. The team addressed every question with patience and expertise. The entire process was smooth, transparent, and professional. Living my dream in Cyprus now!',
          rating: 5,
        },
      ],
    },
    ru: {
      heading: 'Отзывы наших клиентов',
      subheading: 'Отзывы',
      items: [
        {
          name: 'Михаил Андерсон',
          role: 'Генеральный директор',
          country: 'Великобритания',
          content:
            'Выдающийся сервис от начала до конца. Команда помогла нам найти идеальную виллу в Лимассоле и безупречно оформила всю юридическую документацию. Наши инвестиции выросли на 15% всего за два года.',
          rating: 5,
        },
        {
          name: 'Елена Петрова',
          role: 'Предприниматель',
          country: 'Россия',
          content:
            'Профессиональный подход и внимание к деталям впечатлили с первой встречи. Нашли идеальную квартиру с видом на море. Полное сопровождение сделки и помощь в получении ВНЖ. Рекомендую всем!',
          rating: 5,
        },
        {
          name: 'Ханс Шмидт',
          role: 'Инвестор',
          country: 'Германия',
          content:
            'Приобрел три апартамента для инвестиций. Команда предоставила отличный анализ рынка и услуги по управлению недвижимостью. Доходность от аренды превзошла мои ожидания. Очень профессиональное агентство.',
          rating: 5,
        },
        {
          name: 'Софи Дюбуа',
          role: 'Архитектор',
          country: 'Франция',
          content:
            'Исключительный опыт покупки дома для выхода на пенсию в Пафосе. Они идеально поняли наши потребности и показали только те объекты, которые соответствовали нашим критериям. Послепродажная поддержка была замечательной.',
          rating: 5,
        },
        {
          name: 'Дмитрий Иванов',
          role: 'Владелец бизнеса',
          country: 'Россия',
          content:
            'Купил виллу для семьи через это агентство. Прозрачность на всех этапах, честные цены, никаких скрытых комиссий. Помогли с оформлением всех документов. Через год купил еще одну недвижимость для сдачи в аренду.',
          rating: 5,
        },
        {
          name: 'Джеймс Уилсон',
          role: 'Руководитель на пенсии',
          country: 'США',
          content:
            'Как американец, покупающий недвижимость за границей, у меня было много опасений. Команда ответила на каждый вопрос с терпением и экспертностью. Весь процесс был гладким, прозрачным и профессиональным. Теперь живу своей мечтой на Кипре!',
          rating: 5,
        },
      ],
    },
    sk: {
      heading: 'Čo hovoria naši klienti',
      subheading: 'Referencie',
      items: [
        {
          name: 'Michael Anderson',
          role: 'Generálny riaditeľ',
          country: 'Spojené kráľovstvo',
          content:
            'Vynikajúce služby od začiatku do konца. Tím nám pomohol najsť perfektnú vilu v Limassole a bezproblémovo vybavil všetky právne dokumenty. Naša investícia sa za dva roky zhodnotila o 15%.',
          rating: 5,
        },
        {
          name: 'Elena Petrova',
          role: 'Podnikateľka',
          country: 'Rusko',
          content:
            'Profesionálny prístup a pozornosť k detailom ma zapôsobila od prvého stretnutia. Našli ideálny byt s výhľadom na more. Kompletné sprevádzanie transakcie a pomoc pri získaní pobytu. Odporúčam všetkým!',
          rating: 5,
        },
        {
          name: 'Hans Schmidt',
          role: 'Investor',
          country: 'Nemecko',
          content:
            'Kúpil som tri apartmány na investičné účely. Tím poskytol vynikajúcu analýzu trhu a služby správy nehnuteľností. Výnosy z prenájmu predčili moje očakávania. Veľmi profesionálna agentúra.',
          rating: 5,
        },
        {
          name: 'Sophie Dubois',
          role: 'Architektka',
          country: 'Francúzsko',
          content:
            'Výnimočná zkúsenosť pri kúpe nášho dôchodkového domu v Paphos. Perfektne pochopili naše potreby a ukázali nám len nehnuteľnosti, ktoré zodpovedali našim kritériám. Popredajná podpora bola úžasná.',
          rating: 5,
        },
        {
          name: 'Dmitry Ivanov',
          role: 'Majiteľ firmy',
          country: 'Rusko',
          content:
            'Kúpil som vilu pre rodinu prostredníctvom tejto agentúry. Transparentnosť vo všetkých fázach, férové ceny, žiadne skryté poplatky. Pomohli s vybavením všetkých dokumentov. O rok som kúpil ďalšiu nehnuteľnosť na prenájom.',
          rating: 5,
        },
        {
          name: 'James Wilson',
          role: 'Dôchodca',
          country: 'USA',
          content:
            'Ako Američan kupujúci v zahraničí som mal mnoho obáv. Tím riešil každú otázku s trpezlivosťou a odbornosťou. Celý proces bol hladký, transparentný a profesionálny. Teraz žijem svoj sen na Cypre!',
          rating: 5,
        },
      ],
    },
  } as const

  // Create or update testimonials global for each locale
  for (const [locale, data] of Object.entries(seeds)) {
    await payload.updateGlobal({
      slug: 'testimonials',
      req,
      locale: locale as 'en' | 'ru' | 'sk',
      data,
    })
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  const emptyData = {
    heading: '',
    subheading: '',
    items: [],
  }

  for (const locale of ['en', 'ru', 'sk']) {
    await payload.updateGlobal({
      slug: 'testimonials',
      req,
      locale: locale as 'en' | 'ru' | 'sk',
      data: emptyData,
    })
  }
}
