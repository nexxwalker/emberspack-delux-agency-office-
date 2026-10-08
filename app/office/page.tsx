import OfficeTopbar from '@/components/office-topbar'

export default function OfficePage() {
  return (
    <main className="delux-frame">
      <OfficeTopbar />
      <iframe title="Delux crew office" src="/office.html" className="delux-frame__embed" />
    </main>
  )
}
