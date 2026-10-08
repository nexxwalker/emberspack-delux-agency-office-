import OfficeTopbar from '@/components/office-topbar'
import OfficeControls from '@/components/office-controls'

export default function OfficePage() {
  return (
    <main className="delux-frame">
      <OfficeTopbar />
      <OfficeControls />
      <iframe title="Delux crew office" src="/office.html" className="delux-frame__embed" />
    </main>
  )
}
