import React from 'react'
import { fetchEntries } from '../../contentful/client';
import Link from 'next/link'

const Products = ({ products }) => {
  return (
    <>
      <h2>Products</h2>
      <ul className='products'>
        {products.map(p => (
          <li key={p.id}>
            <Link href={`/products/${p.id}`}>
              <a>{p.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
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

export default Products;
