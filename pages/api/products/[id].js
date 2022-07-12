import { getProductInfoById } from '../../../mongoDb/client';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const products = await getProductInfoById(Number(req.query.id));
    res.status(200).json(products);
  } else {
    res.status(401).end();
  }
}
