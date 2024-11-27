'use client';

import "../styles/main.scss"
import React, { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Home_Icon from '@/public/assets/svgs/home_icon.svg'
import Inventory_Icon from '@/public/assets/svgs/inventory_icon.svg'
import Recipe_Icon from '@/public/assets/svgs/recipe_icon.svg'

const NavBarBottom = () => {

  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="navbar-bottom">
      <div className="navbar-bottom__contents">
        <Link href={`/`} className={`navbar-bottom__contents_item ${isActive("/") ? "active_link" : ""}`}>
          <div className="navbar-bottom__contents_item-content">
            <Image src={Home_Icon} alt="Home Icon" unoptimized={true} className="navbar-bottom__contents_item-content--icon" />
            <p className="navbar-bottom__contents_item-content--text">Home</p>
          </div>
        </Link>
        <Link href={`/inventory`} className={`navbar-bottom__contents_item ${isActive("/inventory") ? "active_link" : ""}`}>
          <div className="navbar-bottom__contents_item-content">
            <Image src={Inventory_Icon} alt="Inventory Icon" unoptimized={true} className="navbar-bottom__contents_item-content--icon" />
            <p className="navbar-bottom__contents_item-content--text">Kitchen Inventory</p>
          </div>
        </Link>
        <Link href={`/recipes`} className={`navbar-bottom__contents_item ${isActive("/recipes") ? "active_link" : ""}`}>
          <div className="navbar-bottom__contents_item-content">
            <Image src={Recipe_Icon} alt="Recipe Icon" unoptimized={true} className="navbar-bottom__contents_item-content--icon" />
            <p className="navbar-bottom__contents_item-content--text">Recipes</p>
          </div>
        </Link>
      </div>
    </nav>
  )
}

export default NavBarBottom