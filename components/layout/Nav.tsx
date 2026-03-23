'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { useLang } from '@/lib/LangContext'
import { SERVICES } from '@/lib/content'
import { ChevronDown, X, Menu } from 'lucide-react'

export function Nav() {
  const bar = useRef<HTMLDivElement>(null)
  const [mega, setMega] = useState(false)
  const [mob, setMob] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const { lang, setLang } = useLang()
  const path = usePathname()

  useEffect(() => {
    gsap.fromTo(bar.current, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.3 })
  }, [])
  useEffect(() => { setMega(false); setMob(false) }, [path])

  const openMega = useCallback(() => { clearTimeout(timer.current); setMega(true) }, [])
  const closeMega = useCallback(() => { timer.current = setTimeout(() => setMega(false), 150) }, [])

  return (
    <>
      <div ref={bar} className="nav-bar" style={{ opacity: 0 }}>
        <Link href="/" className="nav-logo">
          <span className="nav-dot" />
          <span className="en">Velour</span>
          <span className="ko">벨루어</span>
        </Link>
        <div className="nav-sep" />

        {/* Desktop links */}
        <div className="hidden lg:flex items-center">
          <div onMouseEnter={openMega} onMouseLeave={closeMega}>
            <button className={`nav-pill-link ${mega ? 'active' : ''}`}>
              <span className="en">Services</span><span className="ko">서비스</span>
              <ChevronDown size={12} className={`transition-transform duration-300 ${mega ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <Link href="/about" className="nav-pill-link">
            <span className="en">About</span><span className="ko">소개</span>
          </Link>
          <Link href="/contact" className="nav-pill-link">
            <span className="en">Contact</span><span className="ko">연락처</span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-3 ml-2">
          {/* Lang toggle — rectangle rounded edges */}
          <div className="lang-toggle">
            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
            <button className={`lang-btn ${lang === 'ko' ? 'active' : ''}`} onClick={() => setLang('ko')}>한국어</button>
          </div>
          <Link href="/contact" className="nav-book-btn">
            <span className="en">Book Now</span><span className="ko">예약하기</span>
          </Link>
        </div>

        {/* Mobile */}
        <button className="lg:hidden text-white/60 hover:text-white ml-3 mr-1" onClick={() => setMob(!mob)}>
          {mob ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mega menu */}
      <div
        className={`mega-wrap ${mega ? 'open' : ''}`}
        onMouseEnter={openMega}
        onMouseLeave={closeMega}
      >
        {/* Left dark panel */}
        <div className="mega-left">
          {/* BG orb */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(circle at 40% 60%, rgba(232,84,122,.2) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(124,58,237,.15) 0%, transparent 50%)'
          }} />
          <div className="relative z-10">
            <p className="text-white/30 text-[10px] tracking-widest uppercase mb-4">Velour Studio</p>
            <p className="text-white text-2xl font-bold tracking-tight leading-tight mb-2">
              <span className="en">All Services</span><span className="ko">모든 서비스</span>
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              <span className="en">08 curated beauty experiences in Edmonton</span>
              <span className="ko">에드먼턴 8가지 뷰티 서비스</span>
            </p>
          </div>
          <div className="relative z-10">
            <Link href="/services" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors no-underline mt-4">
              <span className="en">View All</span><span className="ko">모두 보기</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Right: 2-col 4-per-row grid, all 8 services */}
        <div className="mega-right">
          <p className="text-[10px] tracking-widest uppercase text-muted mb-3 pb-3 border-b border-border">
            <span className="en">Select a Service</span><span className="ko">서비스 선택</span>
          </p>
          <div className="mega-grid">
            {SERVICES.map(svc => (
              <Link key={svc.slug} href={`/services/${svc.slug}`} className="mega-item" onClick={() => setMega(false)}>
                <div className="mega-item-name">
                  <span className="mega-dot" style={{ background: svc.accentStrong }} />
                  <span className="en">{svc.name.en}</span>
                  <span className="ko">{svc.name.ko}</span>
                </div>
                <div className="mega-item-sub">
                  <span className="en">{svc.from.en}</span>
                  <span className="ko">{svc.from.ko}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile full-screen */}
      <div className={`fixed inset-0 z-[4990] bg-ink flex flex-col justify-center px-8 transition-all duration-600 ${mob ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col gap-1 mb-10">
          {[
            { href: '/',         en: 'Home',     ko: '홈' },
            { href: '/services', en: 'Services', ko: '서비스' },
            { href: '/about',    en: 'About',    ko: '소개' },
            { href: '/contact',  en: 'Contact',  ko: '연락처' },
          ].map((l, i) => (
            <Link key={l.href} href={l.href}
              className="text-white/70 hover:text-white no-underline transition-colors"
              style={{ fontSize: 'clamp(40px,8vw,72px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.05, transitionDelay: mob ? `${i*50}ms` : '0ms' }}
              onClick={() => setMob(false)}>
              <span className="en">{l.en}</span><span className="ko">{l.ko}</span>
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn btn-rose" onClick={() => setMob(false)}>
            <span className="en">Book Now</span><span className="ko">예약하기</span>
          </Link>
          <div className="lang-toggle">
            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
            <button className={`lang-btn ${lang === 'ko' ? 'active' : ''}`} onClick={() => setLang('ko')}>한국어</button>
          </div>
        </div>
      </div>
    </>
  )
}
