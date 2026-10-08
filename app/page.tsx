import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Delux crew v3 (Beta)',
  description: 'A 3D isometric office where AI agents do real work.',
}

export default function Page() {
  return (
    <main className="delux-frame">
      <iframe
        title="Delux crew command centre"
        src="/office.html"
        className="delux-frame__embed"
        allow="clipboard-read; clipboard-write"
      />
    </main>
  )
}
