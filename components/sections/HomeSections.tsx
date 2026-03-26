'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useLang } from '@/lib/LangContext'
import { SERVICES, TESTIMONIALS, FAQ_GENERAL } from '@/lib/content'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { Check, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── MARQUEE ─────────────────────────────────────────── */
export function Marquee() {
  const { lang } = useLang()
  const items = SERVICES.map(s => (lang === 'ko' ? s.short.ko : s.short.en))
  const doubled = [...items, ...items, ...items, ...items]
  return (
    <div className="marquee-strip">
      <div className="marquee-inner-track">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-10 px-8 shrink-0">
            <span className="text-[clamp(14px,1.6vw,20px)] font-semibold text-ink tracking-tight whitespace-nowrap">{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-s shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── ABOUT BENTO ─────────────────────────────────────── */
export function AboutBento() {
  const ref = useRef<HTMLElement>(null)
  const [count, setCount] = useState(0)
  const { lang } = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered bento reveal
      gsap.from('.bento-item', {
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
        opacity: 0, y: 40, scale: 0.96, stagger: 0.09, duration: 0.8, ease: 'power3.out',
      })
      // Big text clip
      gsap.to('.about-clip', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y: '0%', duration: 1, stagger: 0.1, ease: 'power4.out',
      })
      // Counter
      ScrollTrigger.create({
        trigger: ref.current, start: 'top 70%', once: true,
        onEnter: () => {
          const o = { v: 0 }
          gsap.to(o, { v: 4800, duration: 2.2, ease: 'power2.out', onUpdate: () => setCount(Math.floor(o.v)) })
        },
      })
      // Parallax on image bento
      gsap.to('.about-parallax-img', {
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        y: -80,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="about" className="min-h-screen py-24 md:py-32 bg-ink">
      <div className="max-w-[1400px] mx-auto px-6 md:px-14">
        {/* Giant heading */}
        <div className="mb-14">
          <div className="t-label mb-5" style={{ color: 'rgba(255,255,255,.35)' }}>
            <span className="en">Our Story</span><span className="ko">우리 이야기</span>
          </div>
          <div className="clip-wrap">
            <div className="about-clip t-xl text-white" style={{ transform: 'translateY(110%)' }}>
              <span className="en">A space that</span>
              <span className="ko">귀를 기울이는</span>
            </div>
          </div>
          <div className="clip-wrap">
            <div className="about-clip t-xl" style={{ transform: 'translateY(110%)', color: 'var(--rose-s)' }}>
              <span className="en">listens.</span>
              <span className="ko">공간.</span>
            </div>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Big text card */}
          <div className="bento-item md:col-span-5 rounded-[28px] p-10 flex flex-col justify-between" style={{ background: 'rgba(255,255,255,.05)', minHeight: 320 }}>
            <p className="text-white/60 text-[16px] leading-relaxed">
              <span className="en">Shinhara was born from one belief: beauty is not a luxury — it is a language. We speak it through every treatment, every product, every quiet moment.</span>
              <span className="ko">신하라 하나의 믿음에서 태어났습니다: 아름다움은 사치가 아닌 언어입니다.</span>
            </p>
            <Link href="/about" className="btn btn-ghost-white self-start mt-8">
              <span className="en">Our Story</span><span className="ko">소개 보기</span>
            </Link>
          </div>

          {/* Image with parallax */}
          <div className="bento-item md:col-span-4 rounded-[28px] overflow-hidden relative" style={{ minHeight: 380 }}>
            <div className="about-parallax-img absolute inset-0" style={{ top: '-20%', bottom: '-20%' }}>
              <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=85" alt=""
                className="w-full h-full object-cover" draggable={false} />
            </div>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,.5) 0%, transparent 50%)' }} />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white text-sm font-medium">Luxury Facials</p>
            </div>
          </div>

          {/* Counter card */}
          <div className="bento-item md:col-span-3 rounded-[28px] p-8 flex flex-col justify-center items-center text-center" style={{ background: 'var(--rose-s)', minHeight: 200 }}>
            <div className="text-[clamp(52px,6vw,80px)] font-bold text-white leading-none tracking-tight">
              {count.toLocaleString()}<sup className="text-2xl">+</sup>
            </div>
            <div className="text-white/70 text-[12px] uppercase tracking-widest mt-3">
              <span className="en">Happy Clients</span><span className="ko">만족한 고객</span>
            </div>
          </div>

          {/* Values row */}
          {[
            { t: { en: 'Presence', ko: '존재감' }, d: { en: 'Artists trained to read you before you speak', ko: '말하기 전에 읽는 아티스트' }, c: 'var(--plum)' },
            { t: { en: 'Craft', ko: '장인정신' }, d: { en: 'Premium materials & relentless refinement', ko: '프리미엄 재료와 끊임없는 개선' }, c: 'var(--sage)' },
            { t: { en: 'Sanctuary', ko: '성역' }, d: { en: 'Every detail from scent to touch is intentional', ko: '모든 세부 사항이 의도적' }, c: 'var(--sky)' },
          ].map((v, i) => (
            <div key={i} className="bento-item md:col-span-4 rounded-[28px] p-8" style={{ background: v.c }}>
              <div className="t-md text-ink mb-3">{v.t[lang]}</div>
              <p className="text-ink/70 text-sm leading-relaxed">{v.d[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── DRAG GALLERY ────────────────────────────────────── */
const GALLERY_CARDS = [
  { img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&q=85', label: { en: 'Nail Art', ko: '네일 아트' }, sub: { en: 'Floral 3D Design', ko: '플로럴 3D 디자인' }, rot: -8, w: 300, h: 380, accent: '#f2b8c6' },
  { img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=85', label: { en: 'Facial Glow', ko: '페이셜 글로우' }, sub: { en: 'HydraFacial', ko: '하이드라페이셜' }, rot: 6, w: 280, h: 360, accent: '#d4bcf5' },
  { img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&q=85', label: { en: 'Brow Sculpt', ko: '눈썹 조각' }, sub: { en: 'Lamination', ko: '라미네이션' }, rot: -4, w: 260, h: 340, accent: '#b8f0cf' },
  { img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&q=85', label: { en: 'Salon Style', ko: '살롱 스타일' }, sub: { en: 'Colour & Cut', ko: '컬러 & 컷' }, rot: 9, w: 290, h: 370, accent: '#b8e4fd' },
  { img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=85', label: { en: 'Beauty Ritual', ko: '뷰티 리추얼' }, sub: { en: 'Full Experience', ko: '풀 익스피리언스' }, rot: -6, w: 270, h: 350, accent: '#f2b8c6' },
  { img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&q=85', label: { en: 'Glow Up', ko: '글로우 업' }, sub: { en: 'Transformation', ko: '변신' }, rot: 5, w: 310, h: 390, accent: '#d4bcf5' },
]
const DOUBLED = [...GALLERY_CARDS, ...GALLERY_CARDS]

export function DragGallery() {
  const ref = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const { lang } = useLang()
  const isDragging = useRef(false)
  const startX = useRef(0)
  const velX = useRef(0)
  const animX = useRef(0)
  const raf = useRef<number>()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.gallery-head-clip', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y: '0%', duration: 1, stagger: 0.1, ease: 'power4.out',
      })
    }, ref)

    const track = trackRef.current
    if (!track) return

    let scrollX = 0

    const onDown = (e: MouseEvent | TouchEvent) => {
      isDragging.current = true
      startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX
      velX.current = 0
      document.body.classList.add('is-dragging')
      if (raf.current) cancelAnimationFrame(raf.current)
    }
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return
      const cx = 'touches' in e ? e.touches[0].clientX : e.clientX
      const dx = cx - startX.current
      velX.current = dx
      scrollX -= dx * 1.6
      startX.current = cx
      gsap.set(track, { x: -scrollX })
      // Tilt cards
      gsap.to('.drag-card', { rotateY: gsap.utils.clamp(-14, 14, -dx / 3), duration: 0.3 })
    }
    const onUp = () => {
      isDragging.current = false
      document.body.classList.remove('is-dragging')
      // Momentum
      const momentum = () => {
        velX.current *= 0.92
        scrollX -= velX.current
        gsap.set(track, { x: -scrollX })
        if (Math.abs(velX.current) > 0.5) raf.current = requestAnimationFrame(momentum)
        else gsap.to('.drag-card', { rotateY: 0, duration: 0.8, ease: 'elastic.out(1,0.6)' })
      }
      raf.current = requestAnimationFrame(momentum)
    }

    track.addEventListener('mousedown', onDown as any)
    track.addEventListener('touchstart', onDown as any, { passive: true })
    window.addEventListener('mousemove', onMove as any)
    window.addEventListener('touchmove', onMove as any, { passive: true })
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)

    return () => {
      ctx.revert()
      track.removeEventListener('mousedown', onDown as any)
      track.removeEventListener('touchstart', onDown as any)
      window.removeEventListener('mousemove', onMove as any)
      window.removeEventListener('touchmove', onMove as any)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <section ref={ref} className="min-h-screen py-24 md:py-32 bg-bg overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-14 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="t-label mb-5"><span className="en">Our Work</span><span className="ko">작업물</span></div>
            <div className="clip-wrap">
              <div className="gallery-head-clip t-xl text-ink" style={{ transform: 'translateY(110%)' }}>
                <span className="en">Seen in studio</span><span className="ko">스튜디오의 작품들</span>
              </div>
            </div>
          </div>
          <p className="text-muted text-sm flex items-center gap-2">
            <span className="w-8 h-px bg-muted" />
            <span className="en">Drag to explore ↔</span><span className="ko">드래그하여 탐색 ↔</span>
          </p>
        </div>
      </div>

      {/* Drag track — pointer-events on for drag, but no links */}
      <div className="relative px-6 md:px-14" style={{ userSelect: 'none' }}>
        <div ref={trackRef} className="drag-gallery-track" style={{ transformStyle: 'preserve-3d' }}>
          {DOUBLED.map((card, i) => (
            <div
              key={i}
              className="drag-card"
              style={{
                width: card.w,
                height: card.h,
                transform: `rotate(${card.rot}deg)`,
                flexShrink: 0,
              }}
            >
              {/* Image */}
              <img src={card.img} alt={card.label.en}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false} />
              {/* Overlay */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,.65) 0%, transparent 50%)' }} />
              {/* Faint big text */}
              <div className="drag-cursor-label">{card.label[lang].toUpperCase()}</div>
              {/* Bottom label */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-white font-bold text-lg leading-tight tracking-tight">
                  {card.label[lang]}
                </p>
                <p className="text-white/60 text-xs mt-1">{card.sub[lang]}</p>
              </div>
              {/* Accent chip */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-ink"
                style={{ background: card.accent }}>
                Shinhara
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── TESTIMONIALS ────────────────────────────────────── */
export function Testimonials() {
  const ref = useRef<HTMLElement>(null)
  const { lang } = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.test-clip', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y: '0%', duration: 1, stagger: 0.1, ease: 'power4.out',
      })
      gsap.from('.test-card', {
        scrollTrigger: { trigger: '.test-card', start: 'top 85%' },
        opacity: 0, y: 40, stagger: 0.12, duration: 0.8, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="min-h-screen py-24 md:py-32 bg-surface">
      <div className="max-w-[1400px] mx-auto px-6 md:px-14">
        <div className="mb-16">
          <div className="t-label mb-5"><span className="en">Client Stories</span><span className="ko">고객 후기</span></div>
          <div className="clip-wrap">
            <div className="test-clip t-xl text-ink" style={{ transform: 'translateY(110%)' }}>
              <span className="en">In their words.</span><span className="ko">고객의 목소리.</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((item, i) => (
            <div key={i} className="test-card card p-8">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-rose-s text-rose-s" />
                ))}
              </div>
              <p className="text-[clamp(15px,1.6vw,18px)] text-ink leading-relaxed font-normal mb-8">
                &ldquo;{item.text[lang]}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-rose flex items-center justify-center text-sm font-bold text-ink">{item.initial}</div>
                <div>
                  <p className="font-semibold text-sm text-ink">{item.name}</p>
                  <p className="text-[11px] text-muted uppercase tracking-wider mt-0.5">{item.service[lang]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── BOOK CTA ────────────────────────────────────────── */
export function BookCTA() {
  const ref = useRef<HTMLElement>(null)
  const { lang } = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.book-clip', {
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
        y: '0%', duration: 1, stagger: 0.12, ease: 'power4.out',
      })
      gsap.from('.book-sub', {
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
      })
      // Background parallax
      gsap.to('.book-bg', {
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 2 },
        scale: 1.08,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-ink">
      {/* Background orbs */}
      <div className="book-bg absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px] opacity-30" style={{ background: 'var(--rose-s)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[80px] opacity-20" style={{ background: 'var(--plum-s)' }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-14 w-full py-24">
        <div className="max-w-[900px]">
          <div className="clip-wrap mb-6">
            <div className="book-clip t-xl text-white" style={{ transform: 'translateY(110%)' }}>
              <span className="en">Ready to</span><span className="ko">시작할</span>
            </div>
          </div>
          <div className="clip-wrap mb-14">
            <div className="book-clip t-xl" style={{ transform: 'translateY(110%)', color: 'var(--rose-s)' }}>
              <span className="en">begin?</span><span className="ko">준비됐나요?</span>
            </div>
          </div>
          <p className="book-sub text-white/45 text-xl leading-relaxed max-w-md mb-10">
            <span className="en">Your ritual awaits. Book online or call — we handle every detail from the moment you arrive.</span>
            <span className="ko">당신의 리추얼이 기다립니다.</span>
          </p>
          <div className="flex flex-wrap gap-4 mb-20">
            <Link href="/contact" className="btn btn-rose text-base px-10 py-5">
              <span className="en">Book Online</span><span className="ko">온라인 예약</span>
            </Link>
            <a href="tel:+17805550199" className="btn btn-ghost-white text-base px-8 py-5">
              <span className="en">+1 (780) 555-0199</span><span className="ko">전화하기</span>
            </a>
          </div>
          {/* Stats */}
          <div className="flex flex-wrap gap-12 pt-10 border-t border-white/10">
            {[{ n: '320+', l: { en: 'Monthly Treatments', ko: '월간 시술' } }, { n: '12', l: { en: 'Master Artists', ko: '마스터 아티스트' } }, { n: '4.9★', l: { en: 'Average Rating', ko: '평균 평점' } }].map(s => (
              <div key={s.n}>
                <div className="text-[clamp(36px,4vw,56px)] font-bold text-white tracking-tight leading-none">{s.n}</div>
                <div className="text-[11px] text-white/35 uppercase tracking-widest mt-2">
                  <span className="en">{s.l.en}</span><span className="ko">{s.l.ko}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ SECTION ─────────────────────────────────────── */
export function FAQSection() {
  const ref = useRef<HTMLElement>(null)
  const { lang } = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.faq-clip', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y: '0%', duration: 1, ease: 'power4.out',
      })
      gsap.from('.faq-right', {
        scrollTrigger: { trigger: '.faq-right', start: 'top 80%' },
        opacity: 0, x: 30, duration: 0.9, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="faq" className="min-h-screen py-24 md:py-32 bg-bg">
      <div className="max-w-[1400px] mx-auto px-6 md:px-14">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          <div>
            <div className="t-label mb-5"><span className="en">FAQ</span><span className="ko">자주 묻는 질문</span></div>
            <div className="clip-wrap mb-8">
              <div className="faq-clip t-xl text-ink" style={{ transform: 'translateY(110%)' }}>
                <span className="en">Got questions?</span><span className="ko">궁금한 점?</span>
              </div>
            </div>
            <p className="text-muted text-[16px] leading-relaxed mb-8">
              <span className="en">Everything you need to know before your first visit — or your hundredth.</span>
              <span className="ko">첫 방문이든 100번째 방문이든 알아야 할 모든 것.</span>
            </p>
            <Link href="/contact" className="btn btn-dark">
              <span className="en">Ask us directly</span><span className="ko">직접 문의하기</span>
            </Link>
          </div>
          <div className="faq-right">
            <FAQAccordion items={FAQ_GENERAL} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── CONTACT SECTION ─────────────────────────────────── */
export function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const { lang } = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.contact-clip', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y: '0%', duration: 1, ease: 'power4.out',
      })
      gsap.from('.contact-form-el', {
        scrollTrigger: { trigger: '.contact-form-el', start: 'top 82%' },
        opacity: 0, y: 20, stagger: 0.08, duration: 0.6, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const inputCls = "w-full bg-bg border border-border rounded-[14px] px-5 py-4 text-ink text-[15px] outline-none focus:border-ink transition-colors placeholder:text-muted/40 font-body"

  return (
    <section ref={ref} id="contact" className="min-h-screen py-24 md:py-32 bg-surface">
      <div className="max-w-[1400px] mx-auto px-6 md:px-14">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <div className="t-label mb-5"><span className="en">Find Us</span><span className="ko">찾아오시는 길</span></div>
            <div className="clip-wrap mb-10">
              <div className="contact-clip t-xl text-ink" style={{ transform: 'translateY(110%)' }}>
                <span className="en">Get in touch.</span><span className="ko">문의하기.</span>
              </div>
            </div>
            {[
              { l: { en: 'Address', ko: '주소' }, v: '10245 Jasper Ave NW\nEdmonton, AB T5J 3N4' },
              { l: { en: 'Hours', ko: '영업시간' }, v: 'Tue – Fri   10am – 8pm\nSat – Sun  9am – 6pm' },
              { l: { en: 'Phone', ko: '전화' }, v: '+1 (780) 555-0199' },
              { l: { en: 'Email', ko: '이메일' }, v: 'hello@shinharabeauty.ca' },
            ].map(item => (
              <div key={item.l.en} className="py-6 border-t border-border">
                <p className="text-[10px] tracking-widest uppercase text-muted mb-2">
                  <span className="en">{item.l.en}</span><span className="ko">{item.l.ko}</span>
                </p>
                <p className="text-[16px] text-ink whitespace-pre-line leading-relaxed">{item.v}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="t-label mb-8">
              <span className="en">Book a Session</span><span className="ko">세션 예약</span>
            </p>
            {submitted ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-sage flex items-center justify-center mx-auto mb-5">
                  <Check size={28} className="text-sage-s" />
                </div>
                <h3 className="t-md text-ink mb-3"><span className="en">Request Received!</span><span className="ko">접수 완료!</span></h3>
                <p className="text-muted"><span className="en">We&apos;ll confirm within 24 hours.</span><span className="ko">24시간 이내에 확인드립니다.</span></p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
                <div className="contact-form-el grid grid-cols-2 gap-4">
                  <input type="text" required className={inputCls} placeholder={lang === 'ko' ? '이름' : 'First name'} />
                  <input type="text" className={inputCls} placeholder={lang === 'ko' ? '성' : 'Last name'} />
                </div>
                <div className="contact-form-el"><input type="email" required className={inputCls} placeholder="Email" /></div>
                <div className="contact-form-el">
                  <select className={`${inputCls} appearance-none`}>
                    <option value="">{lang === 'ko' ? '서비스 선택' : 'Select a service'}</option>
                    {SERVICES.map(s => <option key={s.slug}>{s.name[lang]}</option>)}
                  </select>
                </div>
                <div className="contact-form-el"><input type="date" className={inputCls} /></div>
                <div className="contact-form-el"><textarea rows={3} className={`${inputCls} resize-none`} placeholder={lang === 'ko' ? '메모...' : 'Notes...'} /></div>
                <button type="submit" className="contact-form-el btn btn-dark w-full justify-center py-5 text-[15px]">
                  <span className="en">Request Appointment</span><span className="ko">예약 신청</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
