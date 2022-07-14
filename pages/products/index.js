import React from 'react'
import { fetchEntries } from '../../utils/contentfulClient';
import { hydrateDb } from '../../utils/mongoDbClient';
import Link from 'next/link'
import Layout from '../../components/layout';
import { Card, Image, Text } from '@mantine/core';

export default function Products({ products }) {
  return (
    <Layout>
      <section className='products'>
        <h2 className='products__title'>Products</h2>
        <section className='product-list'>
          {products.map(p => (
            <Link key={p.id} href={`/products/${p.id}`}>
              <Card
                shadow="xl"
                p="xl"
                component="a"
                className="product-card"
              >
                <Card.Section className="image-container">
                  <Image className="image-container__image" src={p.image?.fields?.file?.url} alt={p.name} />
                </Card.Section>
                <Text className="product-card__text" weight={500} size="lg">
                  {p.name}
                </Text>
                <Text className="product-card__price" size="sm">
                  {p.price}kr.
                </Text>
              </Card>
            </Link>
          ))}
        </section>
      </section >
    </Layout>
  )
};

export async function getStaticProps() {
  const res = await fetchEntries();
  const products = res.map((p) => {
    return p.fields;
  });
  await hydrateDb(products);
  return {
    props: {
      products,
    },
  };
};
