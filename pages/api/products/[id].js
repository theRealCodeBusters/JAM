import { getProductInfoById, updateProduct } from '../../../utils/mongoDbClient';

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
    default:
      res.status(400).json({ error: 'Method Not Allowed' });
  }
}
