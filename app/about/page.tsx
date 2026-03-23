import type { Metadata } from 'next'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { AboutPageContent } from '@/components/sections/AboutPageContent'
export const metadata: Metadata = { title: 'About Us', description: "Learn about Velour Studio." }
export default function AboutPage() { return (<><Nav /><main><AboutPageContent /></main><Footer /></>) }
