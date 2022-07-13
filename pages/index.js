import Head from 'next/head'
import Image from 'next/image';
import Layout from '../components/layout/layout';
import RatedProducts from '../components/highestRatedProducts/';
import HeroImg from '../assets/images/hero.jpg';
import { fetchEntries } from '../utils/contentfulClient';
import { topNProducts, getAverage } from '../utils/helpers';
import { getProductsInfo } from '../utils/mongoDbClient';

export default function Home({products, ratings}) {
  return (
    <Layout>
      <div>
        <Head>
          <title>JAM Store</title>
          <meta name="description" content="JAM BAM BUY!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className="hero">
          <h1 className='h-title'>Jamify</h1>
           <Image src={HeroImg} width={1000} height={300} layout='responsive' objectFit='cover' alt="hero image" />
        </header>
        <section>
          <h2 className='h-title'>Featured products</h2>
           <RatedProducts products={products} ratings={ratings}/>
        </section>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const ratings = await getProductsInfo();
  const avgRatings = ratings
    .map(p => ({
      productId: p.productId,
      rating: getAverage(p.ratings)
    }));
  const products = await fetchEntries()
    .then(data => data.map(product => product.fields));
  return {
    props: {
      products: topNProducts(products, ratings, 3),
      ratings: avgRatings,
    }
  };
};
