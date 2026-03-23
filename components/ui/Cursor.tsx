'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const TRAIL = 10

export function Cursor() {
  const mainRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<HTMLDivElement[]>([])
  const pos = useRef({ x: -100, y: -100 })
  const trail = useRef(Array.from({ length: TRAIL }, () => ({ x: -100, y: -100 })))

  useEffect(() => {
    const main = mainRef.current
    if (!main) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      gsap.to(main, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'none' })
    }
    document.addEventListener('mousemove', onMove)

    let raf: number
    const loop = () => {
      trail.current.forEach((p, i) => {
        const src = i === 0 ? pos.current : trail.current[i - 1]
        p.x += (src.x - p.x) * 0.28
        p.y += (src.y - p.y) * 0.28
        const el = trailRefs.current[i]
        if (el) {
          el.style.transform = `translate(${p.x - 2.5}px, ${p.y - 2.5}px)`
          el.style.opacity = String(((TRAIL - i) / TRAIL) * 0.5)
        }
      })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const addHover = () => main.classList.add('hovered')
    const removeHover = () => main.classList.remove('hovered')
    const addDrag = () => main.classList.add('dragging')
    const removeDrag = () => main.classList.remove('dragging')

    document.addEventListener('mousedown', addDrag)
    document.addEventListener('mouseup', removeDrag)

    const els = document.querySelectorAll('a,button,[data-hover]')
    els.forEach(el => { el.addEventListener('mouseenter', addHover); el.addEventListener('mouseleave', removeHover) })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', addDrag)
      document.removeEventListener('mouseup', removeDrag)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={mainRef} className="cursor-main" style={{ left: 0, top: 0 }} />
      {Array.from({ length: TRAIL }).map((_, i) => (
        <div key={i} ref={el => { if (el) trailRefs.current[i] = el }}
          className="cursor-trail" style={{ left: 0, top: 0 }} />
      ))}
    </>
  )
}
