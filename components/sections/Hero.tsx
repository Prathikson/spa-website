'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useLang } from '@/lib/LangContext'
import { ArrowRight, ArrowDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const IMGS = [
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=85',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=85',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=85',
  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=85',
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { lang } = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })

      // Giant text reveal
      tl.to('.hero-clip', { y: '0%', duration: 1.2, stagger: 0.12, ease: 'power4.out' })
        .to('.hero-sub', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .to('.hero-ctas > *', { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, '-=0.5')
        .to('.hero-scroll', { opacity: 1, duration: 0.5 }, '-=0.2')
        .to('.hero-tags > *', { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' }, '-=0.6')

      // Parallax on scroll
      gsap.to('.hero-bg-word', {
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 2 },
        y: -200, opacity: 0,
      })

      // Image float parallax
      gsap.to('.hero-img-1', {
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 1.5 },
        y: -80,
      })
      gsap.to('.hero-img-2', {
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 2 },
        y: -140,
      })
      gsap.to('.hero-img-3', {
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 1 },
        y: -60,
      })

      // Floating image animation
      gsap.to('.hero-img-1', { y: '+=12', duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.to('.hero-img-2', { y: '+=18', duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.8 })
      gsap.to('.hero-img-3', { y: '+=10', duration: 3.5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.4 })

    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative min-h-screen bg-bg overflow-hidden flex flex-col pt-[88px]">
      {/* Giant background word */}
      <div className="hero-bg-word absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display font-bold text-[20vw] text-ink/[0.03] leading-none tracking-[-0.06em] whitespace-nowrap">
          VELOUR
        </span>
      </div>

      {/* Floating images — NOT clickable */}
      <div className="pointer-events-none select-none" aria-hidden="true">
        <div className="hero-img-1 absolute top-[18%] right-[6%] w-[200px] md:w-[260px] aspect-[3/4] rounded-[28px] overflow-hidden shadow-2xl" style={{ rotate: '8deg', zIndex: 2 }}>
          <img src={IMGS[0]} alt="" className="w-full h-full object-cover" draggable={false} />
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
            <p className="text-white text-xs font-medium tracking-wide">Nail Art</p>
          </div>
        </div>
        <div className="hero-img-2 absolute top-[40%] right-[22%] w-[150px] md:w-[200px] aspect-square rounded-[24px] overflow-hidden shadow-xl" style={{ rotate: '-6deg', zIndex: 1 }}>
          <img src={IMGS[1]} alt="" className="w-full h-full object-cover" draggable={false} />
        </div>
        <div className="hero-img-3 absolute bottom-[15%] right-[4%] w-[130px] md:w-[180px] aspect-[4/5] rounded-[24px] overflow-hidden shadow-xl" style={{ rotate: '4deg' }}>
          <img src={IMGS[2]} alt="" className="w-full h-full object-cover" draggable={false} />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-14 pb-8 max-w-[1400px] mx-auto w-full">
        {/* Chips */}
        <div className="hero-tags flex flex-wrap gap-2 mb-10">
          {[
            { text: { en: 'Edmonton, AB', ko: '에드먼턴, AB' }, c: 'chip-rose' },
            { text: { en: 'Est. 2019', ko: '2019년 설립' }, c: 'chip-plum' },
            { text: { en: '4.9★ Rated', ko: '4.9★ 평점' }, c: 'chip-sage' },
          ].map((t, i) => (
            <span key={i} className={`chip ${t.c}`} style={{ opacity: 0, transform: 'translateY(12px)' }}>
              <span className="en">{t.text.en}</span><span className="ko">{t.text.ko}</span>
            </span>
          ))}
        </div>

        {/* Giant headline */}
        <div className="mb-10">
          <div className="clip-wrap">
            <div className="hero-clip t-hero text-ink" style={{ transform: 'translateY(110%)' }}>
              <span className="en">Where Beauty</span>
              <span className="ko">아름다움이</span>
            </div>
          </div>
          <div className="clip-wrap">
            <div className="hero-clip t-hero" style={{ transform: 'translateY(110%)', color: 'var(--rose-s)' }}>
              <span className="en">Meets Ritual.</span>
              <span className="ko">의식이 되는 곳.</span>
            </div>
          </div>
        </div>

        <p className="hero-sub text-muted text-lg md:text-xl font-normal max-w-[440px] leading-relaxed mb-10"
          style={{ opacity: 0, transform: 'translateY(16px)' }}>
          <span className="en">A curated sanctuary for nails, skin, laser, tattoo, and the art of feeling whole — Edmonton.</span>
          <span className="ko">에드먼턴의 네일, 피부, 레이저, 타투를 위한 공간.</span>
        </p>

        <div className="hero-ctas flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-dark" style={{ opacity: 0, transform: 'translateY(12px)' }}>
            <span className="en">Book a Session</span><span className="ko">예약하기</span>
            <ArrowRight size={16} />
          </Link>
          <Link href="/services" className="btn btn-outline" style={{ opacity: 0, transform: 'translateY(12px)' }}>
            <span className="en">Explore Services</span><span className="ko">서비스 보기</span>
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0 }}>
        <span className="text-[10px] tracking-widest uppercase text-muted">
          <span className="en">Scroll</span><span className="ko">스크롤</span>
        </span>
        <ArrowDown size={16} className="text-muted animate-bounce" />
      </div>

      {/* Bottom stat bar */}
      <div className="relative z-10 border-t border-border px-6 md:px-14 py-5">
        <div className="max-w-[1400px] mx-auto flex flex-wrap gap-10 md:gap-16">
          {[
            { n: '4,800+', l: { en: 'Happy Clients', ko: '만족한 고객' } },
            { n: '12',     l: { en: 'Expert Artists', ko: '전문 아티스트' } },
            { n: '4.9★',  l: { en: 'Rating', ko: '평점' } },
            { n: '8',     l: { en: 'Services', ko: '서비스' } },
          ].map(s => (
            <div key={s.n}>
              <div className="text-xl font-bold text-ink tracking-tight">{s.n}</div>
              <div className="text-[11px] text-muted uppercase tracking-wider mt-0.5">
                <span className="en">{s.l.en}</span><span className="ko">{s.l.ko}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
