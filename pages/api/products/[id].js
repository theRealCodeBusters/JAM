import { getProductInfoById, updateProduct, productToCart, removeProductById } from '../../../utils/mongoDbClient';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const products = await getProductInfoById(Number(req.query.id));
      res.status(200).json(products);
      break;
    case 'PATCH':
      await updateProduct(req.body, Number(req.query.id))
        .then(() => {
          res.status(204).end();
        })
        .catch((e) => {
          res.status(500).json({ error: e.message });
        });
      break;
    case 'POST':
      await productToCart(req.body, Number(req.query.id))
        .then(() => {
          res.status(201).end();
        })
        .catch((e) => {
          res.status(500).json({ error: e.message });
        });
      break;
    case 'DELETE':
      await removeProductById(Number(req.query.id))
        .then(() => {
          res.status(200).end();
        })
        .catch((e) => {
          res.status(500).json({ error: e.message });
        });
      break;
    default:
      res.status(400).json({ error: 'Method Not Allowed' });
  }
}
