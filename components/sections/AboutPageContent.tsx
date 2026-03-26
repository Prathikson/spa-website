'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useLang } from '@/lib/LangContext'
import { TESTIMONIALS, FAQ_GENERAL } from '@/lib/content'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function AboutPageContent() {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const { lang } = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.ap-clip', { y: '0%', duration: 1.1, stagger: 0.12, ease: 'power4.out', delay: 0.3 })
      gsap.to('.ap-sec .section-clip', {
        scrollTrigger: { trigger: '.ap-sec', start: 'top 76%' },
        y: '0%', duration: 1, ease: 'power4.out',
      })
      gsap.from('.ap-bento', {
        scrollTrigger: { trigger: '.ap-bento', start: 'top 78%' },
        opacity: 0, y: 32, scale: 0.97, stagger: 0.08, duration: 0.8, ease: 'power3.out',
      })
      gsap.from('.ap-card', {
        scrollTrigger: { trigger: '.ap-card', start: 'top 82%' },
        opacity: 0, y: 24, stagger: 0.1, duration: 0.7, ease: 'power3.out',
      })
      gsap.to('.about-par-img', {
        scrollTrigger: { trigger: '.about-par', start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        y: -80,
      })
      ScrollTrigger.create({
        trigger: ref.current, start: 'top 65%', once: true,
        onEnter: () => {
          const o = { v: 0 }
          gsap.to(o, { v: 4800, duration: 2.2, ease: 'power2.out', onUpdate: () => setCount(Math.floor(o.v)) })
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex flex-col justify-end bg-ink overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 70%, rgba(232,84,122,.15) 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-14 w-full pb-16 pt-36">
          <div className="t-label mb-5" style={{ color: 'rgba(255,255,255,.3)' }}><span className="en">Our Story</span><span className="ko">우리 이야기</span></div>
          <div className="clip-wrap"><div className="ap-clip t-hero text-white" style={{ transform: 'translateY(110%)' }}><span className="en">A space</span><span className="ko">귀를</span></div></div>
          <div className="clip-wrap"><div className="ap-clip t-hero" style={{ transform: 'translateY(110%)', color: 'var(--rose-s)' }}><span className="en">that listens.</span><span className="ko">기울이는 공간.</span></div></div>
        </div>
      </section>

      {/* Intro + image */}
      <section className="py-24 md:py-32 bg-surface">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-muted text-[16px] leading-relaxed mb-6">
              <span className="en">Shinhara was born from one belief: beauty is not a luxury — it is a language. Founded in Edmonton in 2019, we grew from a single-room studio to the city&apos;s most trusted luxury beauty destination.</span>
              <span className="ko">신하라는 하나의 믿음에서 태어났습니다. 2019년 에드먼턴에서 설립되어 성장했습니다.</span>
            </p>
            <p className="text-muted leading-relaxed mb-10">
              <span className="en">Our artists are trained not just in technique, but in presence — the ability to read what you need before you even say it.</span>
              <span className="ko">우리 아티스트들은 기술뿐 아니라 존재감으로 훈련받았습니다.</span>
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[{ n: `${count.toLocaleString()}+`, l: { en: 'Clients', ko: '고객' } }, { n: '12+', l: { en: 'Artists', ko: '아티스트' } }, { n: '4.9★', l: { en: 'Rating', ko: '평점' } }].map(s => (
                <div key={s.n} className="ap-bento card p-5 text-center">
                  <div className="text-2xl font-bold text-ink tracking-tight">{s.n}</div>
                  <div className="text-[10px] text-muted uppercase tracking-wider mt-1">{s.l[lang]}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-par relative rounded-[28px] overflow-hidden aspect-[3/4]">
            <div className="about-par-img absolute" style={{ top: '-15%', bottom: '-15%', left: 0, right: 0 }}>
              <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=700&q=85" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-6 right-6 bg-white rounded-2xl px-5 py-4 shadow-xl">
              <div className="text-3xl font-bold text-ink">{count.toLocaleString()}<sup className="text-lg">+</sup></div>
              <div className="text-[11px] text-muted uppercase tracking-wider mt-0.5"><span className="en">Happy Clients</span><span className="ko">만족한 고객</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="ap-sec py-24 bg-bg">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14">
          <div className="t-label mb-5"><span className="en">What We Stand For</span><span className="ko">우리의 가치</span></div>
          <div className="clip-wrap mb-14"><div className="section-clip t-xl text-ink" style={{ transform: 'translateY(110%)' }}><span className="en">Our values.</span><span className="ko">우리의 가치.</span></div></div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { t: { en: 'Presence', ko: '존재감' }, d: { en: 'Every artist trained to read what you need before you speak.', ko: '말하기 전에 필요한 것을 읽도록 훈련.' }, c: 'var(--rose)' },
              { t: { en: 'Craft', ko: '장인정신' }, d: { en: 'Premium materials and relentless refinement of technique.', ko: '프리미엄 재료와 끊임없는 기술 개선.' }, c: 'var(--plum)' },
              { t: { en: 'Sanctuary', ko: '성역' }, d: { en: 'Every detail from the scent in the air to warmth of towels.', ko: '공기 중 향기부터 수건 온도까지 모든 세부 사항.' }, c: 'var(--sage)' },
            ].map((v, i) => (
              <div key={i} className="ap-bento card p-10" style={{ background: v.c }}>
                <div className="t-md text-ink mb-4">{v.t[lang]}</div>
                <p className="text-ink/65 text-sm leading-relaxed">{v.d[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-surface border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14">
          <div className="t-label mb-10"><span className="en">Client Stories</span><span className="ko">고객 후기</span></div>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((item, i) => (
              <div key={i} className="ap-card card p-7">
                <div className="flex gap-0.5 mb-4">{Array.from({ length: item.rating }).map((_, j) => <Star key={j} size={13} className="fill-rose-s text-rose-s" />)}</div>
                <p className="text-[15px] text-ink leading-relaxed mb-6">&ldquo;{item.text[lang]}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-9 h-9 rounded-full bg-rose flex items-center justify-center text-sm font-bold text-ink">{item.initial}</div>
                  <div><p className="font-semibold text-sm text-ink">{item.name}</p><p className="text-[11px] text-muted uppercase tracking-wider">{item.service[lang]}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-bg border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 grid md:grid-cols-2 gap-16">
          <div>
            <div className="t-label mb-5">FAQ</div>
            <div className="clip-wrap mb-6"><div className="section-clip t-xl text-ink" style={{ transform: 'translateY(110%)' }}><span className="en">Questions?</span><span className="ko">궁금한 점?</span></div></div>
            <Link href="/contact" className="btn btn-dark mt-4 inline-flex"><span className="en">Ask us</span><span className="ko">문의하기</span></Link>
          </div>
          <FAQAccordion items={FAQ_GENERAL} />
        </div>
      </section>

      <section className="py-16 bg-ink text-center">
        <div className="clip-wrap mb-6 inline-block"><div className="section-clip t-lg text-white" style={{ transform: 'translateY(110%)' }}><span className="en">Ready to experience Shinhara?</span><span className="ko">신하라벨루어를 경험할 준비가 됐나요?</span></div></div>
        <div className="mt-4"><Link href="/contact" className="btn btn-rose inline-flex"><span className="en">Book Now</span><span className="ko">예약하기</span></Link></div>
      </section>
    </div>
  )
}
