const { MongoClient, ServerApiVersion } = require('mongodb');
const username = process.env.NEXT_PUBLIC_MONGODB_USERNAME;
const password = process.env.NEXT_PUBLIC_MONGODB_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@cluster0.yxwce.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

export const getProductsInfo = async () => {
  try {
    await client.connect()
    return await client
      .db('JAM')
      .collection('products')
      .find()
      .toArray();
  } catch (err) {
    console.log(err.message);
  } finally {
    await client.close();
  }
};

export const getProductInfoById = async id => {
  try {
    await client.connect()
    return await client
      .db('JAM')
      .collection('products')
      .findOne({ productId: id })
  } catch (err) {
    console.log(err.message);
  } finally {
    await client.close();
  }
};

export default client;
