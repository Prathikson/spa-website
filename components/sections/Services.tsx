'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useLang } from '@/lib/LangContext'
import { SERVICES } from '@/lib/content'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const SVC_IMGS = [
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&q=80',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&q=80',
  'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=200&q=80',
  'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&q=80',
  'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=200&q=80',
  'https://images.unsplash.com/photo-1604502493632-01b58c0a7b74?w=200&q=80',
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&q=80',
  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&q=80',
]

export function Services() {
  const ref = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const { lang } = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.to('.svc-head-clip', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y: '0%', duration: 1, stagger: 0.1, ease: 'power4.out',
      })
      // Rows stagger in
      gsap.from('.svc-row', {
        scrollTrigger: { trigger: '.svc-row', start: 'top 88%' },
        opacity: 0, x: -30, stagger: 0.06, duration: 0.7, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="services" className="min-h-screen py-24 md:py-32 bg-bg">
      <div className="max-w-[1400px] mx-auto px-6 md:px-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="t-label mb-5">
              <span className="en">What We Offer</span><span className="ko">제공 서비스</span>
            </div>
            <div className="clip-wrap">
              <div className="svc-head-clip t-xl text-ink" style={{ transform: 'translateY(110%)' }}>
                <span className="en">Our Services</span><span className="ko">우리의 서비스</span>
              </div>
            </div>
          </div>
          <p className="text-muted max-w-xs text-[15px] leading-relaxed">
            <span className="en">Eight curated experiences, each designed to transform how you feel in your own skin.</span>
            <span className="ko">당신의 피부 속 자신을 변화시키도록 설계된 8가지 서비스.</span>
          </p>
        </div>

        {/* Service rows with round image */}
        <div>
          {SERVICES.map((svc, i) => (
            <Link
              key={svc.slug}
              href={`/services/${svc.slug}`}
              className="svc-row"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Round image */}
              <div
                className="shrink-0 overflow-hidden rounded-full transition-all duration-500"
                style={{
                  width: hovered === i ? 80 : 56,
                  height: hovered === i ? 80 : 56,
                  background: svc.accent,
                }}
              >
                <img
                  src={SVC_IMGS[i]}
                  alt={svc.name.en}
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{ transform: hovered === i ? 'scale(1.12)' : 'scale(1)' }}
                  draggable={false}
                />
              </div>

              {/* Number */}
              <span className="text-[13px] font-mono text-muted shrink-0 w-8">0{i + 1}</span>

              {/* Name */}
              <div className="flex-1 min-w-0">
                <div
                  className="font-medium tracking-tight transition-colors duration-200 leading-tight"
                  style={{
                    fontSize: 'clamp(30px, 2.8vw, 38px)',
                    color: hovered === i ? svc.accentStrong : 'var(--ink)',
                  }}
                >
                  {svc.name[lang]}
                </div>
                <div
                  className="text-muted text-sm transition-all duration-300 overflow-hidden"
                  style={{ maxHeight: hovered === i ? '24px' : 0, opacity: hovered === i ? 1 : 0 }}
                >
                  {svc.tagline[lang]}
                </div>
              </div>

              {/* Tags desktop */}
              <div className="hidden md:flex items-center gap-2 shrink-0">
                {(lang === 'ko' ? svc.tags.ko : svc.tags.en).slice(0, 3).map((tag: string) => (
                  <span key={tag} className="chip text-[11px]">{tag}</span>
                ))}
              </div>

              {/* Price */}
              <span className="text-sm text-muted font-medium shrink-0">{svc.from[lang]}</span>

              {/* Arrow */}
              <ArrowUpRight
                size={18}
                className="shrink-0 transition-all duration-300"
                style={{
                  opacity: hovered === i ? 1 : 0,
                  color: svc.accentStrong,
                  transform: hovered === i ? 'translate(2px,-2px)' : 'translate(0,0)',
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
