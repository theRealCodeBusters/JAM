import React from 'react';
import Image from 'next/image';
import { Badge } from '@mantine/core';
import { fetchEntries } from '../../contentful/client'
import Layout from '../../components/layout/layout';
import Rating from '@mui/material/Rating';

const Product = ({ product }) => {
  const image = product.image.fields;
  return (
    <Layout>
      <section className="product">
        <div className='col-left'>
          <Image src={`http:${image.file.url}`} width={500} height={500} alt={image.title} />
        </div>
        <div className='col-right'>
          <div className="content">
            <h1>{product.name}</h1>
            <hr />
            <p>{product.description}</p>
            <p>{`${product.price}kr`}</p>
            <p>{'stock: '}{product.stock ? product.stock : 'unavailable'}</p>
            <ul>
              {product.category.map(category => (
                <Badge key={category} variant="filled" style={{ marginRight: '0.5rem' }}>{category}</Badge>
              ))}
            </ul>
            <Rating name="rating" value={product.rating} readOnly />
          </div>
          <button className="btn-cart">Add to cart</button>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const products = await fetchEntries();
  const productInfo = products
    .map(product => product.fields)
    .find(product => product.id == id);
  const productStock = await fetch(`http://localhost:3000/api/products/${id}`)
    .then(res => res.json())
    .then(data => data.stock);
  return {
    props: {
      product: {
        ...productInfo,
        stock: productStock
      },
    },
  };
};

export async function getStaticPaths() {
  const res = await fetchEntries();
  const products = res.map(product => product.fields);
  const paths = products.map(product => ({
    params: { id: `${product.id}` },
  }))
  return { paths, fallback: false }
}

export default Product;
