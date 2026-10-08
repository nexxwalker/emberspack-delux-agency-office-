'use client'

import Link from 'next/link'
import { ChevronDown, CircleUserRound, Settings, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

export function OfficeTopbar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="office-topbar">
      <div className="office-topbar__identity">
        <img src="/delux-crew-logo.png" alt="Delux Crew" className="platform-logo platform-logo--office" />
        <span>Delux office</span>
      </div>
      <div className="office-topbar__actions">
        <Link href="/settings" className="office-topbar__link"><SlidersHorizontal aria-hidden="true" /> Settings</Link>
        <div className="profile-menu">
          <button type="button" className="profile-menu__trigger" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            <CircleUserRound aria-hidden="true" /><span>Workspace owner</span><ChevronDown aria-hidden="true" />
          </button>
          {open && <div className="profile-menu__popover" role="menu">
            <div className="profile-menu__summary"><strong>Workspace owner</strong><small>Delux crew member</small></div>
            <Link href="/settings#profile" role="menuitem" onClick={() => setOpen(false)}><CircleUserRound aria-hidden="true" /> Profile</Link>
            <Link href="/settings#appearance" role="menuitem" onClick={() => setOpen(false)}><Settings aria-hidden="true" /> Workspace preferences</Link>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default OfficeTopbar
