import type { Metadata } from 'next'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { ContactPageContent } from '@/components/sections/ContactPageContent'
export const metadata: Metadata = { title: 'Book & Contact', description: "Book at Velour Studio Edmonton." }
export default function ContactPage() { return (<><Nav /><main><ContactPageContent /></main><Footer /></>) }
