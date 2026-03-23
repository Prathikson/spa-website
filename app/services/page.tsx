import type { Metadata } from 'next'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { ServicesPageContent } from '@/components/sections/ServicesPageContent'
export const metadata: Metadata = { title: 'Services', description: "All Velour Studio services in Edmonton." }
export default function ServicesPage() { return (<><Nav /><main><ServicesPageContent /></main><Footer /></>) }
