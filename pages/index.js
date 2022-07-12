import Head from 'next/head'
import Layout from '../components/layout/layout';

export default function Home() {
  return (
    <Layout>
      <div>
        <Head>
          <title>JAM Store</title>
          <meta name="description" content="JAM BAM BUY!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>JAM Store</h1>
        <p>JAM BAM BUY!</p>
      </div>
    </Layout>
  )
}

