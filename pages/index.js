import Head from 'next/head'
import Image from 'next/image';
import Layout from '../components/layout/layout';
import RatedProducts from '../components/highestRatedProducts/';
import HeroImg from '../assets/images/hero.jpg';
import { Card, Text } from '@mantine/core';
import { fetchEntries } from '../contentful/client';

export default function Home({products}) {
  console.log(products)
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
        <header className="hero">
           <Image src={HeroImg} width={1000} height={300} layout='responsive' objectFit='cover' alt="hero image" />
        </header>
        <section>
          <h2>Featured products</h2>
           <RatedProducts products={products}/>
        </section>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetchEntries();
  const products = res.map((p) => {
    return p.fields;
  });
  return {
    props: {
      products,
    },
  };
};
