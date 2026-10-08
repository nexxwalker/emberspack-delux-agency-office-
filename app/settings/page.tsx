'use client'

import Link from 'next/link'
import { ArrowLeft, Check, ExternalLink, Moon, Palette, SlidersHorizontal, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getConnectedServices, testServiceConnection, type ConnectedService } from '@/app/actions/integrations'

const themes = [
  { id: 'night', name: 'Night office', color: '#101310' },
  { id: 'paper', name: 'Warm paper', color: '#f4f0e4' },
  { id: 'forest', name: 'Forest desk', color: '#1d3028' },
  { id: 'ember', name: 'Ember studio', color: '#2b1d1a' },
  { id: 'ocean', name: 'Ocean glass', color: '#152b35' },
]

export default function SettingsPage() {
  const [compact, setCompact] = useState(false)
  const [motion, setMotion] = useState(true)
  const [theme, setTheme] = useState('night')
  const [services, setServices] = useState<ConnectedService[]>([])
  const [testing, setTesting] = useState<string | null>(null)
  const [serviceMessage, setServiceMessage] = useState('')

  useEffect(() => {
    getConnectedServices().then(setServices)
  }, [])

  async function checkService(service: ConnectedService['id']) {
    setTesting(service)
    const result = await testServiceConnection(service)
    setServiceMessage(result.message)
    setTesting(null)
  }

  return (
    <main className={`settings-page settings-page--${theme}`}>
      <header className="settings-header"><Link href="/office" className="settings-back"><ArrowLeft aria-hidden="true" /> Back to office</Link><span className="landing-brand"><img src="/delux-crew-logo.png" alt="Delux Crew" className="platform-logo platform-logo--nav" /><span>Delux crew</span></span><span className="settings-version">Platform settings</span></header>
      <div className="settings-layout">
        <aside className="settings-aside"><p className="landing-eyebrow">Platform / control room</p><h1>Make it<br /><em>yours.</em></h1><p>Set the tone, density, and behavior of your crew across every connected surface.</p><Link href="/office" className="settings-office-link">Open command centre <ExternalLink aria-hidden="true" /></Link></aside>
        <section className="settings-content" aria-label="Platform settings">
          <article className="settings-card"><div className="settings-card__icon"><Palette aria-hidden="true" /></div><div><h2>Platform theme</h2><p>Choose the atmosphere for your workspace.</p><div className="theme-picker" role="radiogroup" aria-label="Platform theme">{themes.map((item) => <button key={item.id} type="button" role="radio" aria-checked={theme === item.id} className={`theme-swatch ${theme === item.id ? 'is-selected' : ''}`} onClick={() => setTheme(item.id)}><span style={{ backgroundColor: item.color }} /><strong>{item.name}</strong></button>)}</div></div></article>
          <article className="settings-card"><div className="settings-card__icon"><SlidersHorizontal aria-hidden="true" /></div><div><h2>Workspace behavior</h2><p>Defaults for the connected crew.</p><div className="settings-option"><div><strong>Compact operations view</strong><small>Reduce spacing in lists and activity feeds.</small></div><button type="button" className={`settings-toggle ${compact ? 'is-on' : ''}`} aria-pressed={compact} onClick={() => setCompact(!compact)}><span /></button></div><div className="settings-option"><div><strong>Motion and live pulses</strong><small>Allow ambient activity animations in the office.</small></div><button type="button" className={`settings-toggle ${motion ? 'is-on' : ''}`} aria-pressed={motion} onClick={() => setMotion(!motion)}><span /></button></div></div></article>
          <article className="settings-card"><div className="settings-card__icon"><Moon aria-hidden="true" /><Sun aria-hidden="true" /></div><div><h2>Connected platform</h2><p>Delux crew v3 / beta workspace</p><div className="settings-status"><Check aria-hidden="true" /><span><strong>Neon data layer connected</strong><small>Agents, tasks, approvals, metrics, and activity are ready for the command centre.</small></span></div></div></article>
          <article id="profile" className="settings-card"><div className="settings-card__icon"><ExternalLink aria-hidden="true" /></div><div><h2>Profile</h2><p>Workspace identity used across your Delux office.</p><div className="profile-settings"><label>Display name<input type="text" defaultValue="Workspace owner" /></label><label>Workspace name<input type="text" defaultValue="Delux crew" /></label></div></div></article><article className="settings-card"><div className="settings-card__icon"><ExternalLink aria-hidden="true" /></div><div><h2>Connected services</h2><p>Review the server connections that power your crew. Secret values are never displayed in this UI.</p><div className="integration-list">{services.length === 0 ? <p className="settings-muted">Loading connected services…</p> : services.map((service) => <div className="integration-row" key={service.id}><div><strong>{service.name}</strong><small>{service.detail}</small><small>{service.setup}</small><small>{service.apiSurface}</small></div><div className="integration-row__actions"><span className={`integration-status ${service.status === 'connected' ? 'is-connected' : ''}`}>{service.status === 'connected' ? 'Connected' : 'Needs setup'}</span><button type="button" className="settings-check-button" onClick={() => checkService(service.id)} disabled={testing === service.id}>{testing === service.id ? 'Checking…' : 'Check connection'}</button></div></div>)}</div>{serviceMessage ? <p className="settings-feedback" role="status">{serviceMessage}</p> : null}</div></article>
        </section>
      </div>
    </main>
  )
}
