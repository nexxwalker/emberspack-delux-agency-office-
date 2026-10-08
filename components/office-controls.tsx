'use client'

import { useState } from 'react'
import { createOfficeActivity } from '@/app/actions/operations'

const themes = {
  ember: { label: 'Ember', accent: '#c5a572', background: '#111411' },
  ocean: { label: 'Ocean', accent: '#6fa0ff', background: '#0d1520' },
  moss: { label: 'Moss', accent: '#8eaf78', background: '#111711' },
  plum: { label: 'Plum', accent: '#d39ac8', background: '#19121b' },
} as const

type ThemeKey = keyof typeof themes

export default function OfficeControls() {
  const [theme, setTheme] = useState<ThemeKey>('ember')
  const [status, setStatus] = useState('Ready')

  async function applyTheme(next: ThemeKey) {
    setTheme(next)
    const selected = themes[next]
    window.parent.document.documentElement.style.setProperty('--office-accent', selected.accent)
    window.parent.document.documentElement.style.setProperty('--office-bg', selected.background)
    window.postMessage({ type: 'delux-office-theme', theme: next, colors: selected }, '*')
    setStatus('Saving…')
    const result = await createOfficeActivity(`Office theme changed to ${selected.label}`)
    setStatus(result.ok ? 'Saved' : 'Saved locally')
  }

  function sendCommand(command: 'focus' | 'reset') {
    window.postMessage({ type: 'delux-office-command', command }, '*')
    setStatus(command === 'focus' ? 'Focus mode enabled' : 'Office view reset')
  }

  return (
    <section className="office-controls" aria-labelledby="office-controls-title">
      <div className="office-controls__heading">
        <div>
          <p className="eyebrow">Office controls</p>
          <h1 id="office-controls-title">Run the office from here.</h1>
        </div>
        <span className="office-controls__status" role="status">{status}</span>
      </div>
      <div className="office-controls__actions">
        <button type="button" onClick={() => sendCommand('focus')}>Focus view</button>
        <button type="button" onClick={() => sendCommand('reset')}>Reset view</button>
        <label>
          <span>Office theme</span>
          <select value={theme} onChange={(event) => applyTheme(event.target.value as ThemeKey)}>
            {Object.entries(themes).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}
          </select>
        </label>
      </div>
    </section>
  )
}
