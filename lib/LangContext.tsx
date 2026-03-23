'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Lang } from '@/lib/content'

interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: (o: { en: string; ko: string }) => string }
const LangContext = createContext<Ctx>({ lang: 'en', setLang: () => {}, t: o => o.en })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  const setLang = (l: Lang) => {
    setLangState(l)
    document.body.classList.toggle('lang-ko', l === 'ko')
    if (typeof window !== 'undefined') sessionStorage.setItem('velour-lang', l)
  }
  useEffect(() => {
    const saved = sessionStorage.getItem('velour-lang') as Lang | null
    if (saved) { setLangState(saved); document.body.classList.toggle('lang-ko', saved === 'ko') }
  }, [])
  const t = (o: { en: string; ko: string }) => o[lang]
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
