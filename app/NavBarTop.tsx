import "../styles/main.scss"
import React, { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Logo_Full from '@/public/assets/svgs/logo-full.svg'
import Menu_Icon_Light from '@/public/assets/svgs/menu_icon-light.svg'

const NavBarTop = () => {
  return (
    <nav className='navbar-top'>

      <div className="navbar-top__contents">
        <Image src={Logo_Full} alt="Logo" unoptimized={true} className="navbar-top__contents_logo" />
        
        <div className="navbar-top__contents_menu">
          <Image src={Menu_Icon_Light} alt="Menu Icon" unoptimized={true} className="navbar-top__contents_menu-icon" />
        </div>
      </div>

      {/* Can Add Further Code to Make a Menu Bar Appear upon Menu Button Click */}

    </nav>
  )
}

export default NavBarTop