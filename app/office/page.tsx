import Link from 'next/link'

export default function OfficePage() {
  return (
    <main className="delux-frame">
      <header className="office-brand-bar">
        <Link href="/" aria-label="Back to Delux Crew landing page"><img src="/delux-crew-logo.png" alt="Delux Crew" className="platform-logo platform-logo--office" /></Link>
        <Link href="/settings" className="office-settings-link">Platform settings</Link>
      </header>
      <iframe title="Delux crew office" src="/office.html" className="delux-frame__embed" />
    </main>
  )
}
