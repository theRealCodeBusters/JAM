import { getProductsInfo } from '../../../utils/mongoDbClient';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const products = await getProductsInfo();
      res.status(200).json(products);
      break;
    default:
      res.status(400).json({ error: 'Method Not Allowed' });
  }
}
