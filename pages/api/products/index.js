// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getProductsStock } from '../../../mongoDb/client';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const products = await getProductsStock();
    res.status(200).json(products);
  } else {
    res.status(401).end();
  }
}
