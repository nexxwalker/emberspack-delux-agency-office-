'use client'

import Link from 'next/link'
import { ArrowLeft, Check, ExternalLink, Moon, Palette, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [compact, setCompact] = useState(false)
  const [motion, setMotion] = useState(true)
  return (
    <main className="settings-page">
      <header className="settings-header"><Link href="/" className="settings-back"><ArrowLeft aria-hidden="true" /> Back to landing</Link><span className="landing-mark">delux<span>crew</span></span><span className="settings-version">Workspace settings</span></header>
      <div className="settings-layout">
        <aside className="settings-aside"><p className="landing-eyebrow">Workspace</p><h1>Settings</h1><p>Configure how your crew feels and behaves across the command centre.</p><Link href="/office" className="settings-office-link">Open command centre <ExternalLink aria-hidden="true" /></Link></aside>
        <section className="settings-content" aria-label="Workspace settings">
          <article className="settings-card"><div className="settings-card__icon"><Palette aria-hidden="true" /></div><div><h2>Appearance</h2><p>Keep the office focused and easy to scan.</p><div className="settings-option"><div><strong>Compact operations view</strong><small>Reduce spacing in lists and activity feeds.</small></div><button type="button" className={`settings-toggle ${compact ? 'is-on' : ''}`} aria-pressed={compact} onClick={() => setCompact(!compact)}><span /></button></div><div className="settings-option"><div><strong>Motion and live pulses</strong><small>Allow ambient activity animations in the office.</small></div><button type="button" className={`settings-toggle ${motion ? 'is-on' : ''}`} aria-pressed={motion} onClick={() => setMotion(!motion)}><span /></button></div></div></article>
          <article className="settings-card"><div className="settings-card__icon"><SlidersHorizontal aria-hidden="true" /></div><div><h2>Operations</h2><p>Defaults for the connected crew.</p><div className="settings-status"><Check aria-hidden="true" /><span><strong>Neon data layer connected</strong><small>Agent, task, approval, metric, and activity records are ready for server actions.</small></span></div></div></article>
          <article className="settings-card"><div className="settings-card__icon"><Moon aria-hidden="true" /></div><div><h2>Workspace identity</h2><p>Delux crew v3 / Beta workspace</p><div className="settings-readonly"><span>Environment</span><strong>Connected preview</strong></div></div></article>
        </section>
      </div>
    </main>
  )
}
