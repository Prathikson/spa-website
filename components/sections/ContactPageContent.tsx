'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '@/lib/LangContext'
import { SERVICES, FAQ_GENERAL } from '@/lib/content'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function ContactPageContent() {
  const ref = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const { lang } = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.cp-clip', { y: '0%', duration: 1.1, stagger: 0.12, ease: 'power4.out', delay: 0.3 })
      gsap.from('.cp-form-el', {
        scrollTrigger: { trigger: '.cp-form', start: 'top 78%' },
        opacity: 0, y: 20, stagger: 0.07, duration: 0.6, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const inputCls = "w-full bg-bg border border-border rounded-[14px] px-5 py-4 text-ink text-[15px] outline-none focus:border-ink transition-colors placeholder:text-muted/40"

  return (
    <div ref={ref}>
      <section className="relative min-h-[60vh] flex flex-col justify-end bg-ink overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 60% 40%, rgba(232,84,122,.12) 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-14 w-full pb-16 pt-36">
          <div className="t-label mb-5" style={{ color: 'rgba(255,255,255,.3)' }}><span className="en">Get in Touch</span><span className="ko">문의하기</span></div>
          <div className="clip-wrap"><div className="cp-clip t-hero text-white" style={{ transform: 'translateY(110%)' }}><span className="en">Book your</span><span className="ko">방문을</span></div></div>
          <div className="clip-wrap"><div className="cp-clip t-hero" style={{ transform: 'translateY(110%)', color: 'var(--rose-s)' }}><span className="en">visit.</span><span className="ko">예약하세요.</span></div></div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-surface">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 grid md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <div className="t-label mb-10"><span className="en">Studio Info</span><span className="ko">스튜디오 정보</span></div>
            {[{ l: { en: 'Address', ko: '주소' }, v: '10245 Jasper Ave NW\nEdmonton, AB T5J 3N4' }, { l: { en: 'Hours', ko: '영업시간' }, v: 'Tue–Fri 10am–8pm\nSat–Sun 9am–6pm' }, { l: { en: 'Phone', ko: '전화' }, v: '+1 (780) 555-0199' }, { l: { en: 'Email', ko: '이메일' }, v: 'hello@velourstudio.ca' }].map(item => (
              <div key={item.l.en} className="py-6 border-t border-border">
                <p className="text-[10px] tracking-widest uppercase text-muted mb-2"><span className="en">{item.l.en}</span><span className="ko">{item.l.ko}</span></p>
                <p className="text-[16px] text-ink whitespace-pre-line leading-relaxed font-normal">{item.v}</p>
              </div>
            ))}
          </div>
          <div>
            <div className="t-label mb-8"><span className="en">Request Appointment</span><span className="ko">예약 신청</span></div>
            {submitted ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-sage flex items-center justify-center mx-auto mb-5"><Check size={28} className="text-sage-s" /></div>
                <div className="t-md text-ink mb-3"><span className="en">Request Received!</span><span className="ko">접수 완료!</span></div>
                <p className="text-muted"><span className="en">We&apos;ll confirm within 24 hours.</span><span className="ko">24시간 이내에 확인드립니다.</span></p>
              </div>
            ) : (
              <form className="cp-form space-y-4" onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
                <div className="cp-form-el grid grid-cols-2 gap-4">
                  <input type="text" required className={inputCls} placeholder={lang === 'ko' ? '이름' : 'First name'} />
                  <input type="text" className={inputCls} placeholder={lang === 'ko' ? '성' : 'Last name'} />
                </div>
                <div className="cp-form-el"><input type="email" required className={inputCls} placeholder="Email" /></div>
                <div className="cp-form-el">
                  <select className={`${inputCls} appearance-none`}>
                    <option value="">{lang === 'ko' ? '서비스 선택' : 'Select a service'}</option>
                    {SERVICES.map(s => <option key={s.slug}>{s.name[lang]}</option>)}
                  </select>
                </div>
                <div className="cp-form-el"><input type="date" className={inputCls} /></div>
                <div className="cp-form-el"><textarea rows={3} className={`${inputCls} resize-none`} placeholder={lang === 'ko' ? '메모...' : 'Notes...'} /></div>
                <button type="submit" className="cp-form-el btn btn-dark w-full justify-center py-5 text-[15px]">
                  <span className="en">Request Appointment</span><span className="ko">예약 신청</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 bg-bg border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 grid md:grid-cols-2 gap-16">
          <div>
            <div className="t-label mb-5"><span className="en">Before You Visit</span><span className="ko">방문 전 확인사항</span></div>
            <div className="clip-wrap mb-8"><div className="section-clip t-lg text-ink" style={{ transform: 'translateY(110%)' }}><span className="en">Common Questions</span><span className="ko">자주 묻는 질문</span></div></div>
          </div>
          <FAQAccordion items={FAQ_GENERAL} />
        </div>
      </section>
    </div>
  )
}
