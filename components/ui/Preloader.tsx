'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function Preloader() {
  const ref = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const pctRef = useRef<HTMLSpanElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('v-loaded')) return
    setShow(true)
    sessionStorage.setItem('v-loaded', '1')
  }, [])

  useEffect(() => {
    if (!show) return
    const letters = ref.current?.querySelectorAll('.pre-l')
    gsap.to(letters, { y: 0, duration: 0.7, stagger: 0.06, ease: 'power4.out', delay: 0.15 })

    let p = 0
    const iv = setInterval(() => {
      p += Math.random() * 11 + 3
      if (p > 100) p = 100
      if (barRef.current) barRef.current.style.width = p + '%'
      if (pctRef.current) pctRef.current.textContent = Math.floor(p) + '%'
      if (p >= 100) {
        clearInterval(iv)
        setTimeout(() => {
          gsap.to(ref.current, {
            yPercent: -100, duration: 1.1, ease: 'power4.inOut',
            onComplete: () => { if (ref.current) ref.current.style.display = 'none' },
          })
        }, 280)
      }
    }, 48)
  }, [show])

  if (!show) return null

  return (
    <div ref={ref} className="preloader">
      <div className="preloader-word">
        {'VELOUR'.split('').map((l, i) => (
          <span key={i} className="pre-l" style={{ transform: 'translateY(110%)' }}>{l}</span>
        ))}
      </div>
      <p className="text-[11px] tracking-[.2em] uppercase text-white/25 mt-2 mb-6">
        Edmonton Beauty Studio
      </p>
      <div className="preloader-bar"><div ref={barRef} className="preloader-bar-fill" /></div>
      <span ref={pctRef} className="preloader-pct">0%</span>
    </div>
  )
}
