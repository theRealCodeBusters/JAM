import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from '@mantine/core';
import Layout from '../../components/layout/layout';
import Rating from '@mui/material/Rating';
import { fetchEntries } from '../../utils/contentfulClient'
import { getAverage } from '../../utils/helpers';

const Product = ({ product }) => {
  const [stock, setStock] = useState(null);
  const [rating, setRating] = useState(0);
  const [newRating, setNewRating] = useState(null);
  const [ratingsAmount, setRatingsAmount] = useState(0);
  const handleRating = async (event, newValue) => {
    if (!newRating) {
      await fetch(`/api/products/${product.id}`,
       { 
        method: 'PATCH', 
        body: JSON.stringify({ "rating": newValue }) 
      });
    }
    setNewRating(newValue);
  };
  const handleBuy = async () => {
    await fetch(`/api/products/${product.id}`,
    { 
     method: 'PATCH', 
     body: JSON.stringify({ "purchase": 1 }) 
   });
   setStock(stock -1);
  }
  useEffect(() => {
    fetch(`/api/products/${product.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setStock(data.stock);
          setRating(newRating ? newRating : getAverage(data.ratings));
          setRatingsAmount(data.ratings.length);
        }
      });
  }, [product.id, newRating]);
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
            <p>{'stock: '}{stock ? stock : 'unavailable'}</p>
            <ul>
              {product.category.map(category => (
                <Badge key={category} variant="filled" style={{ marginRight: '0.5rem' }}>{category}</Badge>
              ))}
            </ul>
            <div className='rating-wrapper'>
              <Rating name="rating" value={rating} onChange={handleRating} />
              <span>{'('}{ratingsAmount}{')'}</span>
            </div>
          </div>
          <button onClick={handleBuy} className="btn-cart">Buy</button>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const products = await fetchEntries();
  const product = products
    .map(product => product.fields)
    .find(product => product.id == id);
  return {
    props: {
      product
    },
  };
}

export async function getStaticPaths() {
  const res = await fetchEntries();
  const products = res.map(product => product.fields);
  const paths = products.map(product => ({
    params: { id: `${product.id}` },
  }))
  return { paths, fallback: false }
}

export default Product;
