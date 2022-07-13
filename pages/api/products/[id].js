import { getProductInfoById } from '../../../utils/mongoDbClient';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const products = await getProductInfoById(Number(req.query.id));
      res.status(200).json(products);
      break;
    case 'POST':
      res.status(200).json({ body: req.body });
      break;
    default:
      res.status(400).json({ error: 'Method Not Allowed' });
  }
}
