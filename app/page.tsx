import type { Metadata } from 'next'
import LandingPage from '@/components/landing-page'

export const metadata: Metadata = {
  title: 'Delux crew — Your company, thinking together',
  description: 'A living command centre for the people, agents, and systems that move your work forward.',
}

export default function Page() {
  return <LandingPage />
}
