import { removeProductById } from '../../../utils/mongoDbClient';

export default async function handler(req, res) {
  switch (req.method) {
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
