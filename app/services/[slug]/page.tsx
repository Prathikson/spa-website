import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { ServiceDetailContent } from '@/components/sections/ServiceDetailContent'
import { SERVICES } from '@/lib/content'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }))
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const svc = SERVICES.find(s => s.slug === params.slug)
  if (!svc) return { title: 'Not Found' }
  return { title: svc.name.en, description: svc.desc.en }
}
export default function ServicePage({ params }: Props) {
  const svc = SERVICES.find(s => s.slug === params.slug)
  if (!svc) notFound()
  return (<><Nav /><main><ServiceDetailContent service={svc} /></main><Footer /></>)
}
