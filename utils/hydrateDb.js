const { createClient } = require('contentful');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv')

dotenv.config({ path: '.env.local' });

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const username = process.env.NEXT_PUBLIC_MONGODB_USERNAME;
const password = process.env.NEXT_PUBLIC_MONGODB_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@cluster0.yxwce.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const contentfulClient = createClient({
  accessToken: accessToken,
  space: space,
});

async function fetchEntries() {
  const entries = await contentfulClient.getEntries();
  if (entries.items)
    return entries.items
}

const hydrate = async () => {
  const res = await fetchEntries();
  const products = res.map((p) => {
    return p.fields;
  });
  const operations = products.map(product => {
    return (
      { updateOne: 
        {
          "filter": { "productId": product.id },
          "update": {
             $setOnInsert: { "productId": product.id, "stock": 10, "ratings": [] }
            },
          "upsert": true,
        }
      }
    )
  })
  try {
    await client.connect()
    return await client
      .db('JAM')
      .collection('products')
      .bulkWrite(operations);
  } catch (err) {
    console.log(err.message);
  } finally {
    await client.close();
  }
};

(async () => {
  const res = await hydrate();
  console.log(res);
})();
