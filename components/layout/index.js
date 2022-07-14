import React from "react"
import Head from 'next/head'
import Header from "./Header"
import Footer from "./Footer"

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>JAM Store</title>
        <meta name="description" content="JAM BAM BUY!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="main-content" >{children}</main>
      <Footer />
    </>
  )
};
