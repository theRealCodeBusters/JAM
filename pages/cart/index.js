import React, { useState, useEffect } from 'react'
import { getTotalPrice, validatePromoCode } from '../../utils/helpers';
import { fetchEntries } from '../../utils/contentfulClient';
import Layout from '../../components/layout';
import { Image } from '@mantine/core';

export default function Cart({ products }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [shippingCost, setShippingCost] = useState(50);
  const [deleted, setDeleted] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const handleRemove = (id) => {
    fetch(`/api/cart/${id}`,
      {
        method: 'DELETE',
      })
      .then(() => {
        setDeleted(!deleted);
      });
  };
  useEffect(() => {
    fetch(`/api/cart`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const productList = data.map(productInfo => {
            const productDetails = products.find(product => product.id === productInfo.productId);
            return (
              {
                ...productDetails,
                amount: productInfo.amount
              }
          )})
          setCartProducts(productList);
        }
      });
  }, [deleted, products]);
  return (
    <Layout>
      <section className="cart">
        {/* LEFT */}
        <section className="products-details">
          <div className="products-details__header">
            <h2>Shopping Cart</h2>
            <h2>
              {cartProducts && cartProducts.reduce(
                (acc, curr) => acc + curr.amount,
                0
              )}
              {' items'}
            </h2>
          </div>
          <hr />
          <table>
            <thead>
              <tr>
                <th> </th>
                <th>PRODUCT</th>
                <th>QUANTITY</th>
                <th>PRICE</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map(p => {
                return (
                  <tr key={p.id}>
                    <td>
                      <Image src={p.image?.fields?.file?.url} alt={p.name} width={150} height={150} />
                    </td>
                    <td className="flex-wrapper">
                      <div>
                        <p>{p.name}</p>
                        <button onClick={() => { handleRemove(p.id) }}>Remove</button>
                      </div>
                    </td>
                    <td>{`x${p.amount}`}</td>
                    <td>{p.price}kr</td>
                    <td>{p.price * p.amount}kr</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
        {/* RIGHT */}
        <aside className="summary">
          <h2>Order Summary</h2>
          <hr />
          <div className="flex-wrapper__summary">
            <p>ITEMS {cartProducts.length}</p>
            <p>{getTotalPrice(cartProducts)}kr.</p>
          </div>
          <p>SHIPPING</p>
          <select onChange={(e) => { setShippingCost(e.target.value) }}>
            <option value="50">Standard delivery - 50kr.</option>
            <option value="75">Express delivery - 75kr.</option>
          </select>
          <p>PROMO CODE</p>
          <input onChange={(e) => { setPromoCode(e.target.value) }} type="text" placeholder="Enter your code" />
          <hr />
          <div className="flex-wrapper__summary">
            <p>TOTAL COST</p>
            <p>{(+getTotalPrice(cartProducts) + +shippingCost) - validatePromoCode(promoCode)}kr.</p>
          </div>
          <button>CHECKOUT</button>
        </aside>
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
