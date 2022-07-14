import React from 'react'
import Link from "next/link"

const header = () => {
  return (
    <header className='header'>
      <nav className="navbar">
        <h2 className="navbar__logo">CodeBusters</h2>
        <ul className='nav-links'>
          <Link href='/'><h3><li className='nav-links__link'>Home</li></h3></Link>
          <Link  href='/products'><h3><li className='nav-links__link'>Products</li></h3></Link>
          <Link href='/cart'><a><li className="nav-links_link">Cart</li></a></Link>
        </ul>
        <h1 className='navbar__title'>JAMify</h1>
      </nav>
    </header>
  )
}

export default header