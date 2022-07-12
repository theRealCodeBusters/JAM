import { getProductsInfo } from '../../../mongoDb/client';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const products = await getProductsInfo();
    res.status(200).json(products);
  } else {
    res.status(401).end();
  }
}
