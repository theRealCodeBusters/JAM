import React from 'react'
import { fetchEntries } from '../../contentful/client';
import Link from 'next/link'
import Layout from '../../components/layout/layout';
import { Card, Image, Text } from '@mantine/core';


const Products = ({ products }) => {
  return (
    <Layout>
      <h2>Products</h2>
      <section className="products">
        <div className='products-list'>
          {products.map(p => (
            <div key={p.id}>
              <Link href={`/products/${p.id}`}>
                <Card
                  shadow="xl"
                  p="xl"
                  component="a"
                  className="product-card"
                >
                  <Card.Section>
                    <Image src={p.image?.fields?.file?.url} alt={p.name} />
                  </Card.Section>

                  <Text className="product-text" weight={500} size="lg">
                    {p.name}
                  </Text>

                  <Text size="sm">
                    {p.price}kr.
                  </Text>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </section>

    </Layout>
  )
};

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
