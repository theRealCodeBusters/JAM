import Image from 'next/image';
import Layout from '../components/layout';
import Featured from '../components/featured';
import HeroImg from '../assets/images/hero.jpg';
import { fetchEntries } from '../utils/contentfulClient';
import { topNProducts, getAverage } from '../utils/helpers';
import { getProductsInfo } from '../utils/mongoDbClient';

export default function Home({ products, ratings }) {
  return (
    <Layout>
      <section className="hero">
        <Image
          className='hero__image'
          src={HeroImg.src} alt="hero image"
          layout='fill'
          placeholder='blur'
          objectFit='cover'
          blurDataURL={HeroImg.blurDataURL}
        />
      </section>
      <Featured products={products} ratings={ratings} />
    </Layout>
  )
}

export async function getServerSideProps() {
  const productInfo = await getProductsInfo();
  const avgRatings = productInfo
    .map(p => ({
      productId: p.productId,
      rating: getAverage(p.ratings)
    }));
  const products = await fetchEntries()
    .then(data => data.map(product => product.fields));
  return {
    props: {
      products: topNProducts(products, productInfo, 3),
      ratings: avgRatings,
    }
  };
};
