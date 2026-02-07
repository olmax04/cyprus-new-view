import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const seeds = {
    en: {
      heading: 'Frequently Asked Questions',
      subheading: 'Got Questions?',
      items: [
        {
          question: 'What are the requirements for buying property in Cyprus?',
          answer:
            'Non-EU citizens can purchase property in Cyprus with minimal restrictions. You need a valid passport, proof of funds, and approval from the Council of Ministers for certain property types. We handle all documentation and legal processes for you.',
        },
        {
          question: 'What are the costs involved in purchasing property?',
          answer:
            'Beyond the property price, expect to pay transfer fees (3-8%), VAT (19% on new properties), stamp duty, legal fees (1%), and registration costs. We provide a detailed breakdown of all costs upfront.',
        },
        {
          question: 'Can foreigners get a mortgage in Cyprus?',
          answer:
            'Yes, many Cyprus banks offer mortgages to non-residents. Typically, you can finance up to 50-70% of the property value. We work with trusted banking partners to secure the best rates.',
        },
        {
          question: 'How long does the buying process take?',
          answer:
            'The typical timeline is 2-4 months from offer acceptance to completion. This includes due diligence, contract signing, and transfer of title deeds. We expedite the process wherever possible.',
        },
        {
          question: 'What are the tax implications of owning property?',
          answer:
            'Property owners pay annual municipal taxes (based on property value) and waste collection fees. Rental income is subject to income tax. Cyprus has favorable tax treaties with many countries. We recommend consulting with our tax advisors.',
        },
        {
          question: 'Do you provide property management services?',
          answer:
            'Yes, we offer comprehensive property management including maintenance, rental management, utility payments, and regular inspections. Perfect for investment properties or vacation homes.',
        },
        {
          question: 'What is the Cyprus residency program?',
          answer:
            'Cyprus offers residency permits to property buyers. Purchase property worth €300,000+ and you can apply for permanent residency, allowing visa-free travel within the Schengen area.',
        },
        {
          question: 'Are properties freehold or leasehold?',
          answer:
            'Most properties in Cyprus are freehold, meaning you own both the property and the land. This provides complete ownership rights and makes properties excellent long-term investments.',
        },
      ],
    },
    ru: {
      heading: 'Часто задаваемые вопросы',
      subheading: 'Есть вопросы?',
      items: [
        {
          question: 'Каковы требования для покупки недвижимости на Кипре?',
          answer:
            'Граждане стран, не входящих в ЕС, могут приобретать недвижимость на Кипре с минимальными ограничениями. Вам потребуется действующий паспорт, подтверждение средств и одобрение Совета министров для определенных типов недвижимости. Мы занимаемся всей документацией и юридическими процессами за вас.',
        },
        {
          question: 'Какие расходы связаны с покупкой недвижимости?',
          answer:
            'Помимо стоимости недвижимости, ожидайте оплату трансферных сборов (3-8%), НДС (19% на новую недвижимость), гербовый сбор, юридические услуги (1%) и регистрационные расходы. Мы предоставляем детальную разбивку всех расходов заранее.',
        },
        {
          question: 'Могут ли иностранцы получить ипотеку на Кипре?',
          answer:
            'Да, многие кипрские банки предлагают ипотеку нерезидентам. Обычно можно финансировать до 50-70% стоимости недвижимости. Мы работаем с надежными банковскими партнерами для получения лучших ставок.',
        },
        {
          question: 'Сколько времени занимает процесс покупки?',
          answer:
            'Типичный срок составляет 2-4 месяца от принятия предложения до завершения сделки. Это включает должную проверку, подписание контракта и передачу права собственности. Мы ускоряем процесс везде, где это возможно.',
        },
        {
          question: 'Каковы налоговые последствия владения недвижимостью?',
          answer:
            'Владельцы недвижимости платят ежегодные муниципальные налоги (в зависимости от стоимости недвижимости) и сборы за вывоз мусора. Доход от аренды облагается подоходным налогом. Кипр имеет выгодные налоговые соглашения со многими странами. Рекомендуем консультацию с нашими налоговыми консультантами.',
        },
        {
          question: 'Предоставляете ли вы услуги по управлению недвижимостью?',
          answer:
            'Да, мы предлагаем комплексное управление недвижимостью, включая обслуживание, управление арендой, оплату коммунальных услуг и регулярные проверки. Идеально для инвестиционной недвижимости или домов для отдыха.',
        },
        {
          question: 'Что такое программа резидентства Кипра?',
          answer:
            'Кипр предлагает вид на жительство покупателям недвижимости. Приобретите недвижимость стоимостью от €300,000+ и вы можете подать заявку на постоянное резидентство, что позволяет безвизовое путешествие по Шенгенской зоне.',
        },
        {
          question: 'Недвижимость в собственность или в аренду?',
          answer:
            'Большинство объектов на Кипре находятся в полной собственности, то есть вы владеете и недвижимостью, и землей. Это обеспечивает полные права собственности и делает недвижимость отличной долгосрочной инвестицией.',
        },
      ],
    },
    sk: {
      heading: 'Často kladené otázky',
      subheading: 'Máte otázky?',
      items: [
        {
          question: 'Aké su požiadavky na kúpu nehnuteľnosti na Cypre?',
          answer:
            'Občania krajín mimo EÚ môžu kupovať nehnuteľnosti na Cypre s minimálnymi obmedzeniami. Budete potrebovať platný pas, doklad o finančných prostriedkoch a schválenie Rady ministrov pre určité typy nehnuteľností. Všetku dokumentáciu a právne procesy vybavujeme za vás.',
        },
        {
          question: 'Aké sú náklady spojené s kúpou nehnuteľnosti?',
          answer:
            'Okrem ceny nehnuteľnosti očakávajte prevodové poplatky (3-8%), DPH (19% na nové nehnuteľnosti), kolková daň, právne poplatky (1%) a registračné náklady. Poskytujeme podrobný rozpis všetkých nákladov vopred.',
        },
        {
          question: 'Môžu cudzinci získať hypotéku na Cypre?',
          answer:
            'Áno, mnohé cyperské banky ponúkajú hypotéky nerezidentom. Zvyčajne môžete financovať až 50-70% hodnoty nehnuteľnosti. Spolupracujeme s dôveryhodnými bankovými partnermi na zabezpečenie najlepších sadzieb.',
        },
        {
          question: 'Ako dlho trvá proces kúpy?',
          answer:
            'Typický časový rámec je 2-4 mesiace od prijatia ponuky po dokončenie. To zahŕňa náležitú kontrolu, podpis zmluvy a prenos vlastníctva. Proces urýchľujeme všade, kde je to možné.',
        },
        {
          question: 'Aké sú daňové dôsledky vlastníctva nehnuteľnosti?',
          answer:
            'Majitelia nehnuteľností platia ročné obecné dane (na základe hodnoty nehnuteľnosti) a poplatky za zber odpadu. Príjem z prenájmu podlieha dani z príjmu. Cyprus má výhodné daňové dohody s mnohými krajinami. Odporúčame konzultáciu s našimi daňovými poradcami.',
        },
        {
          question: 'Poskytujete služby správy nehnuteľností?',
          answer:
            'Áno, ponúkame komplexnú správu nehnuteľností vrátane údržby, správy prenájmu, platby za energie a pravidelných kontrol. Ideálne pre investičné nehnuteľnosti alebo prázdninové domy.',
        },
        {
          question: 'Čo je program cyperského pobytu?',
          answer:
            'Cyprus ponúka povolenia na pobyt kupujúcim nehnuteľností. Kúpte nehnuteľnosť v hodnote €300,000+ a môžete požiadať o trvalý pobyt, čo umožňuje bezvízové cestovanie v schengenskom priestore.',
        },
        {
          question: 'Sú nehnuteľnosti vo vlastníctve alebo v nájme?',
          answer:
            'Väčšina nehnuteľností na Cypre je vo voľnom vlastníctve, čo znamená, že vlastníte nehnuteľnosť aj pozemok. To poskytuje úplné vlastnícke práva a robí z nehnuteľností vynikajúce dlhodobé investície.',
        },
      ],
    },
  } as const

  // Create or update faq global for each locale
  for (const [locale, data] of Object.entries(seeds)) {
    await payload.updateGlobal({
      slug: 'faq',
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
      slug: 'faq',
      req,
      locale: locale as 'en' | 'ru' | 'sk',
      data: emptyData,
    })
  }
}
