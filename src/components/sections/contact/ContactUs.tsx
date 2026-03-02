import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'
import ContactSection from './ContactSection'

export default async function ContactUs() {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const locale = (cookieStore.get('site-locale')?.value || 'en') as 'en' | 'ru' | 'sk'

  const footer = await payload.findGlobal({
    slug: 'footer',
    locale,
  })

  const contact = footer?.contact
  if (!contact) return null

  const t = {
    subheading:
      locale === 'ru'
        ? 'Свяжитесь с нами'
        : locale === 'sk'
          ? 'Kontaktujte nás'
          : 'Get in Touch',
    heading:
      locale === 'ru'
        ? 'Готовы обсудить вашу мечту?'
        : locale === 'sk'
          ? 'Pripravení diskutovať o vašom sne?'
          : 'Ready to Discuss Your Dream?',
    description:
      locale === 'ru'
        ? 'Наша команда экспертов готова помочь вам найти идеальную недвижимость на Кипре. Свяжитесь с нами любым удобным способом.'
        : locale === 'sk'
          ? 'Náš tím odborníkov je pripravený pomôcť vám nájsť ideálnu nehnuteľnosť na Cypre. Kontaktujte nás akýmkoľvek spôsobom.'
          : 'Our team of experts is ready to help you find the perfect property in Cyprus. Reach out to us through any convenient channel.',
    buttonLabel:
      locale === 'ru'
        ? 'Контакты'
        : locale === 'sk'
          ? 'Kontakt'
          : 'Contact Us',
    modalTitle:
      locale === 'ru'
        ? 'Наши контакты'
        : locale === 'sk'
          ? 'Naše kontakty'
          : 'Our Contacts',
    modalSubtitle:
      locale === 'ru'
        ? 'Свяжитесь с нами'
        : locale === 'sk'
          ? 'Kontaktujte nás'
          : 'Get in Touch',
    phoneLabel:
      locale === 'ru' ? 'Телефон' : locale === 'sk' ? 'Telefón' : 'Phone',
    emailLabel: 'Email',
    addressLabel:
      locale === 'ru' ? 'Адрес' : locale === 'sk' ? 'Adresa' : 'Address',
    close:
      locale === 'ru' ? 'Закрыть' : locale === 'sk' ? 'Zavrieť' : 'Close',
  }

  return (
    <ContactSection
      phone={contact.phone}
      email={contact.email}
      address={contact.address}
      t={t}
    />
  )
}
