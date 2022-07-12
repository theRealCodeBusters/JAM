import React from 'react'
import Link from "next/link"


const header = () => {
  return (
    <nav className="navbar">
      <h2 className="navbar__logo">CodeBusters</h2>
      <ul>
        <Link href='/'><a><li>Home</li></a></Link>
        <Link href='/products'><a><li>Products</li></a></Link>
      </ul>
    </nav>
  )
}

export default header