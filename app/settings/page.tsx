'use client'

import Link from 'next/link'
import { ArrowLeft, Check, ExternalLink, Moon, Palette, SlidersHorizontal, Sun } from 'lucide-react'
import { useState } from 'react'

const themes = [
  { id: 'night', name: 'Night office', color: '#101310' },
  { id: 'paper', name: 'Warm paper', color: '#f4f0e4' },
  { id: 'forest', name: 'Forest desk', color: '#1d3028' },
  { id: 'ember', name: 'Ember studio', color: '#2b1d1a' },
  { id: 'ocean', name: 'Ocean glass', color: '#152b35' },
]

const integrations = [
  { name: 'Neon database', detail: 'Operational data, auth schema, and activity history', status: 'Connected' },
  { name: 'OpenAI workspace', detail: 'Agent intelligence and workflow assistance', status: 'Ready to connect' },
  { name: 'WhatsApp channel', detail: 'Conversation and notification delivery', status: 'Ready to connect' },
]

export default function SettingsPage() {
  const [compact, setCompact] = useState(false)
  const [motion, setMotion] = useState(true)
  const [theme, setTheme] = useState('night')
  return (
    <main className={`settings-page settings-page--${theme}`}>
      <header className="settings-header"><Link href="/" className="settings-back"><ArrowLeft aria-hidden="true" /> Back to landing</Link><span className="landing-brand"><span className="landing-brand__mark">Ember<br />Spark</span><span>Delux crew</span></span><span className="settings-version">Platform settings</span></header>
      <div className="settings-layout">
        <aside className="settings-aside"><p className="landing-eyebrow">Platform / control room</p><h1>Make it<br /><em>yours.</em></h1><p>Set the tone, density, and behavior of your crew across every connected surface.</p><Link href="/office" className="settings-office-link">Open command centre <ExternalLink aria-hidden="true" /></Link></aside>
        <section className="settings-content" aria-label="Platform settings">
          <article className="settings-card"><div className="settings-card__icon"><Palette aria-hidden="true" /></div><div><h2>Platform theme</h2><p>Choose the atmosphere for your workspace.</p><div className="theme-picker" role="radiogroup" aria-label="Platform theme">{themes.map((item) => <button key={item.id} type="button" role="radio" aria-checked={theme === item.id} className={`theme-swatch ${theme === item.id ? 'is-selected' : ''}`} onClick={() => setTheme(item.id)}><span style={{ backgroundColor: item.color }} /><strong>{item.name}</strong></button>)}</div></div></article>
          <article className="settings-card"><div className="settings-card__icon"><SlidersHorizontal aria-hidden="true" /></div><div><h2>Workspace behavior</h2><p>Defaults for the connected crew.</p><div className="settings-option"><div><strong>Compact operations view</strong><small>Reduce spacing in lists and activity feeds.</small></div><button type="button" className={`settings-toggle ${compact ? 'is-on' : ''}`} aria-pressed={compact} onClick={() => setCompact(!compact)}><span /></button></div><div className="settings-option"><div><strong>Motion and live pulses</strong><small>Allow ambient activity animations in the office.</small></div><button type="button" className={`settings-toggle ${motion ? 'is-on' : ''}`} aria-pressed={motion} onClick={() => setMotion(!motion)}><span /></button></div></div></article>
          <article className="settings-card"><div className="settings-card__icon"><Moon aria-hidden="true" /><Sun aria-hidden="true" /></div><div><h2>Connected platform</h2><p>Delux crew v3 / beta workspace</p><div className="settings-status"><Check aria-hidden="true" /><span><strong>Neon data layer connected</strong><small>Agents, tasks, approvals, metrics, and activity are ready for the command centre.</small></span></div></div></article>
          <article className="settings-card"><div className="settings-card__icon"><ExternalLink aria-hidden="true" /></div><div><h2>Integrations</h2><p>Manage the services that power your crew.</p><div className="integration-list">{integrations.map((integration) => <div className="integration-row" key={integration.name}><div><strong>{integration.name}</strong><small>{integration.detail}</small></div><span className={integration.status === 'Connected' ? 'integration-status is-connected' : 'integration-status'}>{integration.status}</span></div>)}</div></div></article>
        </section>
      </div>
    </main>
  )
}
