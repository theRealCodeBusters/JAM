import React, { useState, useEffect } from 'react'
import { getTotalPrice, validatePromoCode } from '../../utils/helpers';
import Layout from '../../components/layout/layout';
import { Image } from '@mantine/core';


const Products = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [shippingCost, setShippingCost] = useState(50);
  const [promoCode, setPromoCode] = useState("");

  const handleRemove = async (id) => {
    // setCartProducts(cartProducts.filter(product => product.id !== id));
    await fetch(`/api/products/${id}`,
      {
        method: 'DELETE',
      });
  }

  const handleFetch = async () => {
    setTimeout(() => {

      fetch(`/api/cart`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setCartProducts(data);
          }
        });
    }, 1000);
  }




  useEffect(() => {
    handleFetch()
  }, [cartProducts]);

  return (
    <Layout>
      <section className="cart">
        {/* LEFT */}
        <section className="products-details">
          <div className="products-details__header">
            <h2>Shopping Cart</h2>
            <h2>{cartProducts && cartProducts.length} items</h2>
          </div>
          <hr />
          <table>
            <thead>
              <tr>
                <th>PRODUCT DETAILS</th>
                <th>QUANTITY</th>
                <th>PRICE</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map(p => {
                return (
                  <tr key={p._id}>
                    <td className="flex-wrapper">
                      <Image src={p.image?.fields?.file?.url} alt={p.name} width={150} height={150} />
                      <div>
                        <p>{p.name}</p>
                        <button onClick={() => { handleRemove(p._id) }}>Remove</button>
                      </div>
                    </td>
                    <td>quantity</td>
                    <td>{p.price}kr.</td>
                    <td>total price</td>
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


export default Products;
