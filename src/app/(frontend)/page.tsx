import Hero, { serifFont, sansFont } from '@/components/sections/hero/Hero'
import AboutUs from '@/components/sections/about/AboutUs'
import SectionDivider from '@/components/sections/divider/SectionDivider'
import Testimonials from '@/components/sections/testimonials/Testimonials'
import FAQ from '@/components/sections/faq/FAQ'
import Footer from '@/components/layout/Footer'

export default async function Page() {
  return (
    <div className={`${serifFont.variable} ${sansFont.variable}`}>
      <Hero />
      <AboutUs />
      <SectionDivider />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  )
}
