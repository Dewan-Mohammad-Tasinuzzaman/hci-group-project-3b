import "../styles/main.scss"
import React, { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Logo_Full from '@/public/assets/svgs/logo-full.svg'
import Logout_Icon from '@/public/assets/svgs/logout_icon.svg'

const NavBarTop = () => {
  return (
    <nav className='navbar-top'>

      <div className="navbar-top__contents">
        <Image src={Logo_Full} alt="Logo" unoptimized={true} className="navbar-top__contents_logo" />
        
        <Link href={`/login`} className="navbar-top__contents_menu" title="Sign Out">
          <Image src={Logout_Icon} alt="Menu Icon" unoptimized={true} className="navbar-top__contents_menu-icon" />
        </Link>
      </div>

      {/* Can Add Further Code to Make a Menu Bar Appear upon Menu Button Click */}

    </nav>
  )
}

export default NavBarTop