import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { fetchEntries } from '../../contentful/client'


const Product = ({ product }) => {
  const router = useRouter()
  const { id } = router.query

  const image = product.image.fields.file
  const width = 300;


  const calculateHeight = (details, width) => {
    const aspectRatio = details.image.width / details.image.height;
    return width / aspectRatio;
  }
  const ACCESS_KEY = process.env.NEXT_PUBLIC_ACCESS_KEY
  const url = `//api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&page=1&query=${product.name}&fit=crop&w=${width}`

  return (
    <>
      <h1>product: {id}</h1>
      <div className='product-card'>
        <Image src={`https:${url}`} width={width} height={calculateHeight(image.details, width)} alt='' />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <ul>
          {product.category.map(cat => (
            <li key={cat}>{cat}</li>
          ))}
        </ul>
        <p>{product.price}</p>
        <p>{`rating: ${product.rating}`}</p>
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetchEntries();
  const products = res.map(p => p.fields);
  const product = products.find(p => p.id == id);
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
