import Link from 'next/link'
import { SERVICES } from '@/lib/content'

export function Footer() {
  return (
    <footer className="bg-ink">
      <div className="max-w-[1400px] mx-auto px-6 md:px-14">
        <div className="py-16 grid md:grid-cols-4 gap-10 border-b border-white/6">
          <div className="md:col-span-1">
            <p className="text-white font-bold text-xl tracking-tight mb-3">
              <span className="en">Shinhara</span><span className="ko">신하라</span>
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              <span className="en">Edmonton&apos;s sanctuary for beauty &amp; wellness.</span>
              <span className="ko">에드먼턴의 뷰티 &amp; 웰니스 성역.</span>
            </p>
            <p className="text-white/25 text-xs mt-3">10245 Jasper Ave NW · Edmonton AB</p>
          </div>
          <div>
            <p className="text-[10px] tracking-widest uppercase text-white/25 mb-5">
              <span className="en">Services</span><span className="ko">서비스</span>
            </p>
            <ul className="space-y-3">
              {SERVICES.slice(0, 4).map(s => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-white/50 hover:text-white transition-colors no-underline">
                    <span className="en">{s.short.en}</span><span className="ko">{s.short.ko}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] tracking-widest uppercase text-white/25 mb-5">
              <span className="en">More</span><span className="ko">더 보기</span>
            </p>
            <ul className="space-y-3">
              {SERVICES.slice(4).map(s => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-white/50 hover:text-white transition-colors no-underline">
                    <span className="en">{s.short.en}</span><span className="ko">{s.short.ko}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] tracking-widest uppercase text-white/25 mb-5">Studio</p>
            <ul className="space-y-3">
              {[{ href: '/about', en: 'About', ko: '소개' }, { href: '/services', en: 'Services', ko: '서비스' }, { href: '/contact', en: 'Contact', ko: '연락처' }, { href: '/contact', en: 'Book Now', ko: '예약하기' }].map(l => (
                <li key={l.en}>
                  <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors no-underline">
                    <span className="en">{l.en}</span><span className="ko">{l.ko}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/25 text-xs">
            <span className="en">&copy; 2026 Shinhara Beauty Edmonton. All rights reserved.</span>
            <span className="ko">&copy; 2026 신하라 스튜디오 에드먼턴. 모든 권리 보유.</span>
          </p>
          <div className="flex gap-2">
            {['ig', 'tk', 'fb'].map(s => (
              <a key={s} href="#" className="w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center text-[11px] text-white/40 hover:border-white/30 hover:text-white/70 transition-colors no-underline">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
