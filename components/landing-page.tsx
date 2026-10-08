'use client'

import Link from 'next/link'
import { ArrowUpRight, Check, ExternalLink } from 'lucide-react'

const connections = [
  ['◉', 'OpenAI', 'AI across your workflow'],
  ['◌', 'WhatsApp', 'Stay in conversation'],
  ['⌘', '3D office', 'Explore a space that is yours'],
]

export function LandingPage() {
  return (
    <main className="landing-page landing-page--dark">
      <nav className="landing-nav" aria-label="Primary navigation">
        <Link href="/" className="landing-brand"><span className="landing-brand__mark">Ember<br />Spark</span><span>Delux crew</span></Link>
        <div className="landing-nav__links">
          <a href="#experience">The experience</a><a href="#connections">Connections</a><a href="#experience">Explore the office ↗</a><Link href="/settings">Sign in</Link><Link href="/office" className="landing-nav__launch">Get started ↗</Link>
        </div>
      </nav>

      <section className="landing-hero landing-hero--reference">
        <div className="landing-hero__copy"><p className="landing-eyebrow">Tour your work, beautifully in order</p><h1>Big ideas.<br />Clear direction.<br /><em>Your own space.</em></h1><p className="landing-lede">Bring your workflows, connections, and next steps together. Delux crew gives your ambition a workspace that feels entirely yours.</p><div className="landing-actions"><Link href="/office" className="landing-button landing-button--gold">Create your workspace ↗</Link><a href="#experience" className="landing-button landing-button--outline">Discover the experience</a></div><p className="landing-note"><Check aria-hidden="true" /> Personal workspace · No card required · Your colors, your space</p></div>
        <figure className="landing-preview"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-10-08_13-42-28-xVr34GNKdkuXXtUj0V8mAY54dK6W7P.jpg" alt="Delux crew workspace preview" /><figcaption><span>A workspace, made personal.</span><span>An illustrative preview of your workspace</span></figcaption></figure>
      </section>

      <section id="connections" className="landing-connections"><p>Your connections.<br /><span>A world of possibility.</span></p>{connections.map(([symbol, title, copy]) => <div key={title} className="landing-connection"><b>{symbol}</b><span><strong>{title}</strong><small>{copy}</small></span></div>)}</section>
      <section id="experience" className="landing-capabilities landing-capabilities--dark"><div className="landing-section-heading"><p className="landing-eyebrow">Designed around you</p><h2>Less scattered.<br /><em>More intentional.</em></h2></div><p className="landing-experience-copy">From the first idea to the final check, give every piece of work a place — and give yourself a clearer view.</p><div className="landing-cards"><article className="landing-card"><small>01 / Your work</small><h3>See the whole picture.</h3></article><article className="landing-card"><small>02 / Your connections</small><h3>Bring your tools closer.</h3></article><article className="landing-card"><small>03 / Your style</small><h3>Make yourself at home.</h3></article></div></section>
      <footer className="landing-footer"><span>Delux crew / your own space</span><Link href="/settings">Shape the platform <ExternalLink aria-hidden="true" /></Link></footer>
    </main>
  )
}

export default LandingPage
