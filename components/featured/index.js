import React from 'react';
import Link from 'next/link';
import Rating from '@mui/material/Rating';
import { Card, Image, Text } from '@mantine/core';

export default function Featured({products, ratings}) {
  return (
    <section className='featured'>
      <h1 className='featured__title'>Featured Products</h1>
      <section className='featured-products'>
      {products && products.map(p => {
        const productRating = ratings.find(pr => pr.productId === p.id).rating;
        return (
          <Link key={p.id} href={`/products/${p.id}`}>
            <Card
              shadow="xl"
              p="xl"
              component="a"
              className="featured-card"
            >
              <Card.Section className='image-container'>
                <Image className='image-container__image' src={p.image?.fields?.file?.url} alt={p.name} />
              </Card.Section>
              <Text className="featured-card__text" weight={500} size="lg">
                {p.name}
              </Text>
              <Text className='featured-card__price' size="sm">
                {p.price}kr.
              </Text>
              <Rating className='featured-card__rating' value={Number(productRating)} precision={0.5} readOnly/>
            </Card>
          </Link>
        )})}
      </section>
    </section>
  )
}
