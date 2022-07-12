import React from 'react'
import Link from "next/link"


const header = () => {
  return (
    <nav>
      <ul>
        <Link href='/'><a><li>Home</li></a></Link>
        <Link href='/products'><a><li>Products</li></a></Link>
      </ul>
    </nav>
  )
}

export default header