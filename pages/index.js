import { Image } from '@mantine/core';
import Layout from '../components/layout';
import Featured from '../components/featured';
import HeroImg from '../assets/images/hero.jpg';
import { fetchEntries } from '../utils/contentfulClient';
import { topNProducts, getAverage } from '../utils/helpers';
import { getProductsInfo } from '../utils/mongoDbClient';

export default function Home({products, ratings}) {
  return (
    <Layout>
      <section className="hero">
        <Image className='hero__image' src={HeroImg.src} alt="hero image" fit='fill' />
      </section>
      <Featured products={products} ratings={ratings} />
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
