'use client'
import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Plus } from 'lucide-react'
import { useLang } from '@/lib/LangContext'

type Item = { q: { en: string; ko: string }; a: { en: string; ko: string } }

let gUID = 0

export function FAQAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const { lang } = useLang()
  const uid = useRef(++gUID)

  function toggle(i: number) {
    const getEl = (n: number) =>
      document.querySelector<HTMLElement>(`.acc-b-${uid.current}-${n}`)
    const body = getEl(i)
    if (!body) return
    if (open === i) {
      gsap.to(body, { height: 0, duration: 0.32, ease: 'power3.inOut' })
      setOpen(null)
    } else {
      if (open !== null) {
        const prev = getEl(open)
        if (prev) gsap.to(prev, { height: 0, duration: 0.28, ease: 'power3.inOut' })
      }
      gsap.set(body, { height: 'auto' })
      const h = body.offsetHeight
      gsap.fromTo(body, { height: 0 }, { height: h, duration: 0.38, ease: 'power3.out' })
      setOpen(i)
    }
  }

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="border-t border-border last:border-b">
          <button onClick={() => toggle(i)}
            className="acc-btn flex items-center justify-between gap-4 py-6 w-full group">
            <span className={`font-medium text-[16px] text-left leading-snug transition-colors ${open === i ? 'text-rose-s' : 'text-ink group-hover:text-rose-s'}`}>
              {item.q[lang]}
            </span>
            <span className={`w-8 h-8 rounded-[10px] border flex items-center justify-center shrink-0 transition-all duration-300 ${open === i ? 'bg-ink border-ink rotate-45' : 'border-border text-muted'}`}>
              <Plus size={14} className={open === i ? 'text-white' : ''} />
            </span>
          </button>
          <div className={`acc-b-${uid.current}-${i}`} style={{ height: 0, overflow: 'hidden' }}>
            <p className="text-muted leading-relaxed pb-6 text-[15px]">{item.a[lang]}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
