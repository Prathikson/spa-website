'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useLang } from '@/lib/LangContext'
import { SERVICES, FAQ_GENERAL } from '@/lib/content'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

type SVC = (typeof SERVICES)[0]

const chipMap: Record<string, string> = {
  'chip-rose': 'var(--rose)', 'chip-plum': 'var(--plum)', 'chip-sage': 'var(--sage)', 'chip-sky': 'var(--sky)',
}

export function ServiceDetailContent({ service }: { service: SVC }) {
  const ref = useRef<HTMLDivElement>(null)
  const { lang } = useLang()
  const all = SERVICES
  const idx = all.findIndex(s => s.slug === service.slug)
  const prev = all[idx - 1]
  const next = all[idx + 1]
  const accentBg = chipMap[service.chip] || service.accent

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.sd-hero-clip', { y: '0%', duration: 1.1, stagger: 0.12, ease: 'power4.out', delay: 0.3 })
      gsap.from('.sd-hero-sub', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', delay: 0.8 })
      gsap.to('.sd-parallax-img', {
        scrollTrigger: { trigger: '.sd-hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
        y: -100,
      })

      const triggers = ['.sd-about', '.sd-steps', '.sd-pricing', '.sd-products', '.sd-faq']
      triggers.forEach(sel => {
        gsap.from(`${sel} > *`, {
          scrollTrigger: { trigger: sel, start: 'top 80%' },
          opacity: 0, y: 30, stagger: 0.09, duration: 0.7, ease: 'power3.out',
        })
        gsap.to(`${sel} .section-clip`, {
          scrollTrigger: { trigger: sel, start: 'top 78%' },
          y: '0%', duration: 1, ease: 'power4.out',
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const TAGS_EN = service.tags.en as string[]
  const TAGS_KO = service.tags.ko as string[]
  const tags = lang === 'ko' ? TAGS_KO : TAGS_EN
  const tagChips = ['chip-rose', 'chip-plum', 'chip-sage', 'chip-sky']

  return (
    <div ref={ref}>
      {/* ── HERO ── */}
      <section className="sd-hero relative min-h-[80vh] flex flex-col justify-end overflow-hidden" style={{ background: accentBg }}>
        {/* Parallax background image */}
        <div className="sd-parallax-img absolute inset-0" style={{ top: '-15%', bottom: '-15%' }}>
          <div className="w-full h-full opacity-20" style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1600&q=80)`,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }} />
        </div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${accentBg} 30%, transparent 80%)` }} />

        {/* Big faint label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-display font-bold text-[18vw] text-ink/[0.06] leading-none tracking-[-0.06em] whitespace-nowrap">
            {service.name.en.split(' ')[0]}
          </span>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-14 w-full pb-16 pt-36">
          <Link href="/services" className="inline-flex items-center gap-2 text-[12px] text-ink/50 hover:text-ink no-underline mb-10 transition-colors font-medium tracking-wide uppercase">
            <ArrowLeft size={14} /> <span className="en">All Services</span><span className="ko">모든 서비스</span>
          </Link>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className={`chip ${service.chip}`}>{service.from[lang]}</span>
            <span className="chip">{service.duration[lang]}</span>
          </div>
          <div className="clip-wrap">
            <div className="sd-hero-clip t-hero text-ink" style={{ transform: 'translateY(110%)' }}>
              {service.name[lang]}
            </div>
          </div>
          <p className="sd-hero-sub text-ink/55 text-xl max-w-md leading-relaxed mt-5">
            {service.tagline[lang]}
          </p>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="sd-about py-24 md:py-32 bg-surface">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="t-label mb-5"><span className="en">About this Service</span><span className="ko">서비스 소개</span></div>
            <div className="clip-wrap mb-6">
              <div className="section-clip t-lg text-ink" style={{ transform: 'translateY(110%)' }}>
                {service.name[lang]}
              </div>
            </div>
            <p className="text-muted leading-relaxed text-[16px] mb-7">{service.desc[lang]}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag, i) => <span key={tag} className={`chip ${tagChips[i % 4]}`}>{tag}</span>)}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="card p-6">
                <p className="text-[10px] tracking-widest uppercase text-muted mb-2"><span className="en">Duration</span><span className="ko">소요 시간</span></p>
                <p className="text-xl font-bold text-ink tracking-tight">{service.duration[lang]}</p>
              </div>
              <div className="card p-6">
                <p className="text-[10px] tracking-widest uppercase text-muted mb-2"><span className="en">From</span><span className="ko">시작 가격</span></p>
                <p className="text-xl font-bold text-ink tracking-tight">{service.from[lang]}</p>
              </div>
            </div>
            <Link href="/contact" className="btn btn-dark"><span className="en">Book This Service</span><span className="ko">이 서비스 예약하기</span></Link>
          </div>

          {/* Steps */}
          <div className="sd-steps">
            <div className="t-label mb-7"><span className="en">What to Expect</span><span className="ko">진행 과정</span></div>
            {service.steps.map((step, i) => (
              <div key={i} className="flex gap-5 py-6 border-t border-border items-start last:border-b">
                <span className="w-8 h-8 rounded-xl flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5"
                  style={{ background: accentBg, color: service.accentStrong }}>
                  {i + 1}
                </span>
                <p className="text-ink text-[15px] leading-relaxed font-normal">
                  <span className="en">{step.en}</span><span className="ko">{step.ko}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="sd-pricing py-24 md:py-32 bg-bg">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14">
          <div className="t-label mb-5"><span className="en">Pricing</span><span className="ko">가격</span></div>
          <div className="clip-wrap mb-14">
            <div className="section-clip t-xl text-ink" style={{ transform: 'translateY(110%)' }}>
              <span className="en">Packages &amp; Memberships</span><span className="ko">패키지 &amp; 멤버십</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {service.packages.map((pkg, i) => (
              <div key={i} className={`price-card relative ${pkg.featured ? 'featured' : ''}`}>
                {pkg.badge && (
                  <span className="absolute -top-3.5 left-6 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-[8px]"
                    style={{ background: service.accentStrong, color: '#fff' }}>
                    {pkg.badge[lang]}
                  </span>
                )}
                <div>
                  <p className={`text-[11px] tracking-widest uppercase mb-3 ${pkg.featured ? 'text-white/50' : 'text-muted'}`}>
                    {pkg.name[lang]}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-[clamp(40px,5vw,56px)] font-bold tracking-tight leading-none ${pkg.featured ? 'text-white' : 'text-ink'}`}>
                      {pkg.price}
                    </span>
                    <span className={`text-sm ${pkg.featured ? 'text-white/50' : 'text-muted'}`}>{pkg.period[lang]}</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1">
                  {(lang === 'ko' ? pkg.features.ko : pkg.features.en).map((f: string) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check size={14} className={`mt-0.5 shrink-0 ${pkg.featured ? 'text-white/60' : 'text-sage-s'}`} />
                      <span className={pkg.featured ? 'text-white/80' : 'text-ink'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`btn w-full justify-center ${pkg.featured ? 'btn-rose' : 'btn-outline'}`}>
                  <span className="en">Book Now</span><span className="ko">예약하기</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="sd-products py-20 md:py-24 bg-surface">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14">
          <div className="t-label mb-5"><span className="en">Recommended Products</span><span className="ko">추천 제품</span></div>
          <div className="clip-wrap mb-10">
            <div className="section-clip t-lg text-ink" style={{ transform: 'translateY(110%)' }}>
              <span className="en">Take your results home</span><span className="ko">결과를 집으로</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {service.products.map((prod, i) => (
              <div key={i} className="card p-7 relative overflow-hidden">
                <div className="absolute top-5 right-5">
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded-[8px]"
                    style={{ background: prod.color }}>
                    {prod.tag[lang]}
                  </span>
                </div>
                <div className="w-14 h-14 rounded-2xl mb-5 flex items-center justify-center text-2xl font-bold"
                  style={{ background: prod.color, color: 'var(--ink)' }}>✦</div>
                <p className="font-semibold text-ink text-[16px] mb-1 tracking-tight">{prod.name}</p>
                <p className="text-2xl font-bold text-ink tracking-tight mt-2">{prod.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sd-faq py-24 md:py-32 bg-bg">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 grid md:grid-cols-2 gap-16">
          <div>
            <div className="t-label mb-5">FAQ</div>
            <div className="clip-wrap mb-6">
              <div className="section-clip t-lg text-ink" style={{ transform: 'translateY(110%)' }}>
                <span className="en">Questions about</span><span className="ko">관련 질문:</span>
              </div>
            </div>
            <div className="clip-wrap">
              <div className="section-clip t-lg" style={{ transform: 'translateY(110%)', color: service.accentStrong }}>
                {service.short[lang]}
              </div>
            </div>
            <Link href="/contact" className="btn btn-dark mt-10 inline-flex">
              <span className="en">Ask us</span><span className="ko">문의하기</span>
            </Link>
          </div>
          <FAQAccordion items={[...service.faq, ...FAQ_GENERAL.slice(0, 3)]} />
        </div>
      </section>

      {/* ── RELATED + PREV/NEXT ── */}
      <section className="py-20 bg-surface border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14">
          <div className="t-label mb-8"><span className="en">More Services</span><span className="ko">다른 서비스</span></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICES.filter(s => s.slug !== service.slug).slice(0, 4).map(s => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card p-6 no-underline group">
                <div className="w-9 h-9 rounded-full mb-4" style={{ background: s.accent }} />
                <p className="font-semibold text-[15px] text-ink group-hover:text-rose-s transition-colors leading-snug tracking-tight">
                  {s.name[lang]}
                </p>
                <p className="text-[12px] text-muted mt-1">{s.from[lang]}</p>
              </Link>
            ))}
          </div>
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
            {prev ? (
              <Link href={`/services/${prev.slug}`} className="flex items-center gap-3 text-muted hover:text-ink no-underline group transition-colors">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted/60 mb-0.5"><span className="en">Previous</span><span className="ko">이전</span></p>
                  <p className="font-semibold text-sm text-ink tracking-tight">{prev.name[lang]}</p>
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/services/${next.slug}`} className="flex items-center gap-3 text-muted hover:text-ink no-underline group transition-colors text-right">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted/60 mb-0.5"><span className="en">Next</span><span className="ko">다음</span></p>
                  <p className="font-semibold text-sm text-ink tracking-tight">{next.name[lang]}</p>
                </div>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </div>
  )
}
