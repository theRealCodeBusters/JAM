import React from 'react';
import Link from 'next/link'

import { Card, Image, Text } from '@mantine/core';

const RatedProducts = ({products}) => {
  console.log(products)
  return (
    <section>
      <div>
        {products && products.map(p => (
            <div key={p.id}>
              <Link href={`/products/${p.id}`}>
                <Card
                  shadow="xl"
                  p="xl"
                  component="a"
                  className="product-card"
                >
                  <Card.Section>
                    <Image src={p.image?.fields?.file?.url} alt={p.name} width={300}  height={200}/>
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
  )
}

export default RatedProducts;



