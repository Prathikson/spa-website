'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useLang } from '@/lib/LangContext'
import { SERVICES, FAQ_GENERAL } from '@/lib/content'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const IMGS = [
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=85',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=85',
  'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=85',
  'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=85',
  'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=85',
  'https://images.unsplash.com/photo-1604502493632-01b58c0a7b74?w=800&q=85',
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=85',
  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=85',
]

export function ServicesPageContent() {
  const ref = useRef<HTMLDivElement>(null)
  const { lang } = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.sp-clip', { y: '0%', duration: 1.1, stagger: 0.12, ease: 'power4.out', delay: 0.3 })
      gsap.from('.sp-card', {
        scrollTrigger: { trigger: '.sp-grid', start: 'top 78%' },
        opacity: 0, y: 60, stagger: 0.1, duration: 1, ease: 'power3.out',
      })
      gsap.to('.faq-clip', { 
        scrollTrigger: { trigger: '.faq-section', start: 'top 80%' },
        y: '0%', 
        duration: 1, 
        ease: 'power4.out' 
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      {/* Hero Section */}
      <section className="relative min-h-[65vh] flex flex-col justify-end bg-ink overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 80% 30%, rgba(232,84,122,.12) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(124,58,237,.1) 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-10 lg:px-14 w-full pb-16 pt-36">
          <div className="t-label mb-5" style={{ color: 'rgba(255,255,255,.3)' }}>
            <span className="en">All Services</span><span className="ko">모든 서비스</span>
          </div>
          <div className="clip-wrap">
            <div className="sp-clip t-hero text-white" style={{ transform: 'translateY(110%)' }}>
              <span className="en">Our</span><span className="ko">우리의</span>
            </div>
          </div>
          <div className="clip-wrap">
            <div className="sp-clip t-hero" style={{ transform: 'translateY(110%)', color: 'var(--rose-s)' }}>
              <span className="en">craft.</span><span className="ko">기술.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Reference Image Style */}
      <section className="bg-bg py-12 md:py-16 lg:py-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-14">
          
          {/* First Row - 3 Cards */}
          <div className="sp-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mb-16 md:mb-20 lg:mb-24">
            {SERVICES.slice(0, 3).map((svc, i) => (
              <Link 
                key={svc.slug} 
                href={`/services/${svc.slug}`} 
                className="sp-card group block no-underline"
              >
                {/* Image Square */}
                <div className="relative w-full aspect-square rounded-[20px] md:rounded-[24px] overflow-hidden mb-6 md:mb-8 bg-surface">
                  <img 
                    src={IMGS[i]} 
                    alt={svc.name.en} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    draggable={false} 
                  />
                </div>
                
                {/* Title */}
                <h2 className="font-bold text-ink text-[clamp(28px,4vw,48px)] tracking-tight leading-[1.1] mb-4 md:mb-6 group-hover:text-rose-s transition-colors duration-300">
                  {svc.name[lang]}
                </h2>
                
                {/* Details List */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between group/item">
                    <span className="text-sm md:text-base text-muted group-hover/item:text-ink transition-colors">
                      {svc.from[lang]}
                    </span>
                  </div>
                  <div className="flex items-start justify-between group/item">
                    <span className="text-sm md:text-base text-muted group-hover/item:text-ink transition-colors">
                      {svc.tagline[lang]}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Second Row - 3 Cards */}
          <div className="sp-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mb-16 md:mb-20 lg:mb-24">
            {SERVICES.slice(3, 6).map((svc, i) => (
              <Link 
                key={svc.slug} 
                href={`/services/${svc.slug}`} 
                className="sp-card group block no-underline"
              >
                {/* Image Square */}
                <div className="relative w-full aspect-square rounded-[20px] md:rounded-[24px] overflow-hidden mb-6 md:mb-8 bg-surface">
                  <img 
                    src={IMGS[i + 3]} 
                    alt={svc.name.en} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    draggable={false} 
                  />
                </div>
                
                {/* Title */}
                <h2 className="font-bold text-ink text-[clamp(28px,4vw,48px)] tracking-tight leading-[1.1] mb-4 md:mb-6 group-hover:text-rose-s transition-colors duration-300">
                  {svc.name[lang]}
                </h2>
                
                {/* Details List */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between group/item">
                    <span className="text-sm md:text-base text-muted group-hover/item:text-ink transition-colors">
                      {svc.from[lang]}
                    </span>
                  </div>
                  <div className="flex items-start justify-between group/item">
                    <span className="text-sm md:text-base text-muted group-hover/item:text-ink transition-colors">
                      {svc.tagline[lang]}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Third Row - 2 Wider Cards */}
          <div className="sp-grid grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            {SERVICES.slice(6, 8).map((svc, i) => (
              <Link 
                key={svc.slug} 
                href={`/services/${svc.slug}`} 
                className="sp-card group block no-underline"
              >
                {/* Image Square - Taller for last row */}
                <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[20px] md:rounded-[24px] overflow-hidden mb-6 md:mb-8 bg-surface">
                  <img 
                    src={IMGS[i + 6]} 
                    alt={svc.name.en} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    draggable={false} 
                  />
                </div>
                
                {/* Title - Larger for last row */}
                <h2 className="font-bold text-ink text-[clamp(32px,5vw,56px)] tracking-tight leading-[1.1] mb-4 md:mb-6 group-hover:text-rose-s transition-colors duration-300">
                  {svc.name[lang]}
                </h2>
                
                {/* Details List */}
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-start justify-between group/item">
                    <span className="text-base md:text-lg text-muted group-hover/item:text-ink transition-colors">
                      {svc.from[lang]}
                    </span>
                  </div>
                  <div className="flex items-start justify-between group/item">
                    <span className="text-base md:text-lg text-muted group-hover/item:text-ink transition-colors">
                      {svc.tagline[lang]}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section py-20 md:py-24 lg:py-32 bg-surface border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
          <div>
            <div className="text-[11px] tracking-[0.2em] uppercase text-muted mb-6">FAQ</div>
            <div className="clip-wrap mb-8">
              <h2 className="faq-clip text-ink font-bold text-[clamp(32px,5vw,56px)] tracking-tight leading-[1.1]" style={{ transform: 'translateY(110%)' }}>
                <span className="en">Common Questions</span><span className="ko">자주 묻는 질문</span>
              </h2>
            </div>
            <Link href="/contact" className="btn btn-dark mt-4 inline-flex">
              <span className="en">Contact Us</span><span className="ko">문의하기</span>
            </Link>
          </div>
          <div>
            <FAQAccordion items={FAQ_GENERAL} />
          </div>
        </div>
      </section>
    </div>
  )
}