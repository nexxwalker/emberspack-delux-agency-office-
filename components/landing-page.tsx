'use client'

import Link from 'next/link'
import { ArrowUpRight, Blocks, BrainCircuit, Check, Settings2 } from 'lucide-react'

const highlights = [
  { icon: BrainCircuit, title: 'One operating brain', copy: 'Coordinate agents, departments, and connectors from a single calm command centre.' },
  { icon: Blocks, title: 'Real work, visible', copy: 'Tasks, approvals, activity, and performance stay connected instead of hiding in tabs.' },
  { icon: Settings2, title: 'Built to adapt', copy: 'Shape the crew around your workflows with clear settings and durable operations data.' },
]

export function LandingPage() {
  return (
    <main className="landing-page">
      <nav className="landing-nav" aria-label="Primary navigation">
        <Link href="/" className="landing-mark">delux<span>crew</span></Link>
        <div className="landing-nav__links">
          <a href="#capabilities">Capabilities</a>
          <Link href="/settings">Settings</Link>
          <Link href="/office" className="landing-nav__launch">Open command centre <ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero__copy">
          <p className="landing-eyebrow">Delux crew / operations system</p>
          <h1>Your company, <em>thinking together.</em></h1>
          <p className="landing-lede">A living command centre for the people, agents, and systems that move your work forward.</p>
          <div className="landing-actions">
            <Link href="/office" className="landing-button landing-button--dark">Enter the office <ArrowUpRight aria-hidden="true" /></Link>
            <a href="#capabilities" className="landing-button landing-button--quiet">See how it works</a>
          </div>
          <p className="landing-note"><Check aria-hidden="true" /> Connected to your operations workspace</p>
        </div>
        <div className="landing-hero__orb" aria-hidden="true"><span>crew</span><div className="orb-ring orb-ring--one" /><div className="orb-ring orb-ring--two" /><div className="orb-dot orb-dot--one" /><div className="orb-dot orb-dot--two" /></div>
      </section>

      <section id="capabilities" className="landing-capabilities">
        <div className="landing-section-heading"><p className="landing-eyebrow">The operating layer</p><h2>Everything important,<br /><em>in the room.</em></h2></div>
        <div className="landing-cards">{highlights.map(({ icon: Icon, title, copy }) => <article className="landing-card" key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <footer className="landing-footer"><span>delux crew v3 / beta</span><Link href="/control">Operations console <ArrowUpRight aria-hidden="true" /></Link></footer>
    </main>
  )
}

export default LandingPage
