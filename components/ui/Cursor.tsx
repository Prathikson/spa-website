'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const TRAIL_COUNT = 10

export function Cursor() {
  const mainRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<HTMLDivElement[]>([])
  const mousePos = useRef({ x: -100, y: -100 })
  const trailPos = useRef(Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 })))
  
  // State to track cursor mode: 'default' | 'pointer' | 'drag'
  const [mode, setMode] = useState<'default' | 'pointer' | 'drag'>('default')

  useEffect(() => {
    const main = mainRef.current
    if (!main) return

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      gsap.set(main, { x: e.clientX, y: e.clientY })
    }

    const onDown = () => setMode('drag')
    const onUp = () => {
        // Check if we are still hovering over a pointer element when letting go
        const hoveredEl = document.querySelectorAll(':hover')
        const isOverPointer = Array.from(hoveredEl).some(el => 
            window.getComputedStyle(el).cursor === 'pointer' || el.hasAttribute('data-hover')
        )
        setMode(isOverPointer ? 'pointer' : 'default')
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    // Physics Loop for the "Train"
    let raf: number
    const loop = () => {
      trailPos.current.forEach((p, i) => {
        const target = i === 0 ? mousePos.current : trailPos.current[i - 1]
        p.x += (target.x - p.x) * (0.2 - i * 0.01)
        p.y += (target.y - p.y) * (0.2 - i * 0.01)
        
        const el = trailRefs.current[i]
        if (el) {
          el.style.transform = `translate(${p.x}px, ${p.y}px) scale(${1 - i * 0.08})`
          el.style.opacity = String(((TRAIL_COUNT - i) / TRAIL_COUNT) * 0.4)
        }
      })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Handle Hovering over links/buttons
    const handlePointerIn = () => setMode('pointer')
    const handlePointerOut = () => setMode('default')

    const refreshListeners = () => {
      const targets = document.querySelectorAll('a, button, [data-hover], .nav-pill-link')
      targets.forEach(t => {
        t.addEventListener('mouseenter', handlePointerIn)
        t.addEventListener('mouseleave', handlePointerOut)
      })
    }
    refreshListeners()

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={mainRef} className={`cursor-wrapper mode-${mode}`}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="cursor-svg">
          <defs>
            <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f2b8c6" /> {/* var(--rose) */}
              <stop offset="100%" stopColor="#e8547a" /> {/* var(--rose-s) */}
            </linearGradient>
          </defs>
          
          {/* Default Arrow */}
          <path 
            className="path-default"
            d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" 
            fill="url(#pinkGrad)" stroke="white" strokeWidth="1.5" strokeLinejoin="round" 
          />
          
          {/* Heart (Pointer) */}
          <path 
            className="path-pointer"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="url(#pinkGrad)" stroke="white" strokeWidth="1"
          />

          {/* Drag Arrows < > */}
          <path 
            className="path-drag"
            d="M7 8l-4 4 4 4M17 8l4 4-4 4M2 12h20"
            stroke="url(#pinkGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Trail Train */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div key={i} ref={el => { if (el) trailRefs.current[i] = el }} className="cursor-trail-dot" />
      ))}
    </>
  )
}