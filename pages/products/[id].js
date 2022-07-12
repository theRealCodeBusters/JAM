import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { fetchEntries } from '../../contentful/client'
import Layout from '../../components/layout/layout';

const Product = ({ product }) => {
  const router = useRouter()
  const { id } = router.query
  console.log(product.image)
  return (
    <Layout>
      <h1>product: {id}</h1>
      <div className='product-card'>
        <Image src={product.image} width={400} height={400} alt='' />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <ul>
          {product.category.map(cat => (
            <li key={cat}>{cat}</li>
          ))}
        </ul>
        <p>{`${product.price}kr`}</p>
        <p>{`rating: ${product.rating}`}</p>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetchEntries();
  const products = res.map(p => p.fields);
  const product = products.find(p => p.id == id);
  const ACCESS_KEY = process.env.NEXT_PUBLIC_ACCESS_KEY
  const url = `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&page=1&per_page=1&query=${product.name}`;
  const image = await fetch(url)
    .then(res => res.json())
    .then(data => data.results[0].urls.raw);
  product.image = `${image}&fit=crop&w=400&h=400&crop=faces`;

  return {
    props: {
      product,
    },
  };
};

export async function getStaticPaths() {
  const res = await fetchEntries();
  const products = res.map(p => p.fields);
  const paths = products.map((product) => ({
    params: { id: (product.id).toString() },
  }))

  return { paths, fallback: false }
}

export default Product;
