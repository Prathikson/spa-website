import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Marquee, AboutBento, DragGallery, Testimonials, BookCTA, FAQSection, ContactSection } from '@/components/sections/HomeSections'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <AboutBento />
        <Services />
        <DragGallery />
        <Testimonials />
        <BookCTA />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
