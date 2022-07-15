import React, { useState, useEffect } from 'react';
import { Badge, Image, Button } from '@mantine/core';
import Layout from '../../components/layout';
import Rating from '@mui/material/Rating';
import { fetchEntries } from '../../utils/contentfulClient'
import { getAverage } from '../../utils/helpers';

export default function Product({ product }) {
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
    setStock(stock - 1);
    await fetch(`/api/cart`,
      {
        method: 'POST',
        body: JSON.stringify({ "productId": product.id})
      });
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
        <section className='col-left'>
          <Image className='col-left__image' src={`http:${image.file.url}`} alt={image.title} />
        </section>
        <section className='col-right'>
          <div className="content">
            <h1 className='content__title'>{product.name}</h1>
            <hr className='content__divider' />
            <p className='content__description'>{product.description}</p>
          </div>
          <div className='product-data'>
            <div className="rating-wrapper">
              <Rating className="rating-wrapper__rating" value={Number(rating)} onChange={handleRating} precision={0.5} />
              <span className='rating-wrapper__count'>{'('}{ratingsAmount}{')'}</span>
            </div>
            <ul className='category-list'>
              {product.category.map(category => (
                <Badge key={category} className="category-list__badge" variant="filled" style={{ marginInline: '0.5rem' }}>{category}</Badge>
              ))}
            </ul>
          </div>
          <div className='price-and-stock'>
            <span className='price-and-stock__stock'>{'stock: '}{stock ? stock : 'loading'}</span>
            <h3 className='price-and-stock__price'>{`${product.price}kr`}</h3>
          </div>
          <Button className="col-right__button" onClick={handleBuy}>Buy</Button>
        </section>
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
