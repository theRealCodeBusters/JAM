import { getCartProducts, productToCart } from '../../../utils/mongoDbClient';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const products = await getCartProducts();
      res.status(200).json(products);
      break;
    case 'POST':
      await productToCart(req.body)
        .then(() => {
          res.status(201).end();
        })
        .catch((e) => {
          res.status(500).json({ error: e.message });
        });
      break;
    default:
      res.status(400).json({ error: 'Method Not Allowed' });
  }
}

