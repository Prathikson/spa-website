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
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80',
  'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&q=80',
  'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80',
  'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&q=80',
  'https://images.unsplash.com/photo-1604502493632-01b58c0a7b74?w=400&q=80',
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80',
  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80',
]

export function ServicesPageContent() {
  const ref = useRef<HTMLDivElement>(null)
  const { lang } = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.sp-clip', { y: '0%', duration: 1.1, stagger: 0.12, ease: 'power4.out', delay: 0.3 })
      gsap.from('.sp-card', {
        scrollTrigger: { trigger: '.sp-grid', start: 'top 78%' },
        opacity: 0, y: 36, scale: 0.97, stagger: 0.07, duration: 0.8, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      <section className="relative min-h-[65vh] flex flex-col justify-end bg-ink overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 80% 30%, rgba(232,84,122,.12) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(124,58,237,.1) 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-14 w-full pb-16 pt-36">
          <div className="t-label mb-5" style={{ color: 'rgba(255,255,255,.3)' }}><span className="en">All Services</span><span className="ko">모든 서비스</span></div>
          <div className="clip-wrap"><div className="sp-clip t-hero text-white" style={{ transform: 'translateY(110%)' }}><span className="en">Our</span><span className="ko">우리의</span></div></div>
          <div className="clip-wrap"><div className="sp-clip t-hero" style={{ transform: 'translateY(110%)', color: 'var(--rose-s)' }}><span className="en">craft.</span><span className="ko">기술.</span></div></div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-bg">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14">
          <div className="sp-grid grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((svc, i) => (
              <Link key={svc.slug} href={`/services/${svc.slug}`} className="sp-card card p-0 overflow-hidden no-underline group block">
                <div className="relative h-48 overflow-hidden rounded-t-[24px]">
                  <img src={IMGS[i]} alt={svc.name.en} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" draggable={false} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,.4) 0%, transparent 60%)' }} />
                  <span className={`absolute top-4 left-4 chip ${svc.chip}`}>{svc.from[lang]}</span>
                </div>
                <div className="p-7">
                  <h2 className="font-bold text-[clamp(18px,2vw,24px)] text-ink group-hover:text-rose-s transition-colors tracking-tight mb-2">{svc.name[lang]}</h2>
                  <p className="text-[13px] text-muted leading-relaxed mb-4">{svc.tagline[lang]}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-ink">{svc.from[lang]}</span>
                    <ArrowUpRight size={16} className="text-muted group-hover:text-rose-s transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 grid md:grid-cols-2 gap-16">
          <div>
            <div className="t-label mb-5">FAQ</div>
            <div className="clip-wrap mb-6"><div className="section-clip t-xl text-ink" style={{ transform: 'translateY(110%)' }}><span className="en">Common Questions</span><span className="ko">자주 묻는 질문</span></div></div>
            <Link href="/contact" className="btn btn-dark mt-4 inline-flex"><span className="en">Contact Us</span><span className="ko">문의하기</span></Link>
          </div>
          <FAQAccordion items={FAQ_GENERAL} />
        </div>
      </section>
    </div>
  )
}
