import React from "react"
import Header from "./header"
import Footer from "./footer"


export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main >{children}</main>
      <Footer />
    </div>
  )
}