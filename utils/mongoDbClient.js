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

export const updateProduct = async (reqBody, id) => {
  try {
    const body = JSON.parse(reqBody);
    await client.connect();
    if (body.rating) {
      await client
        .db('JAM')
        .collection('products')
        .findOneAndUpdate(
          { productId: id },
          {
            $push: { ratings: body.rating }
          })
    }
    if (body.purchase) {
      await client
        .db('JAM')
        .collection('products')
        .findOneAndUpdate({ productId: id }, { $inc: { stock: (body.purchase * -1) } })
    }
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    await client.close();
  }
};

// CART
export const getCartProducts = async () => {
  try {
    await client.connect()
    return await client
      .db('JAM')
      .collection('carts')
      .find()
      .toArray();
  } catch (err) {
    console.log(err.message);
  } finally {
    await client.close();
  }
};

export const productToCart = async (reqBody) => {
  const body = JSON.parse(reqBody);
  try {
    const query = { productId: body.productId };
    const update = { $inc: { amount: 1 } };
    const options = { upsert: true };
    await client.connect();
    return await client
      .db('JAM')
      .collection('carts')
      .updateOne(query, update, options);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    await client.close();
  }
};

export const removeProductById = async id => {
  try {
    await client.connect()
    return await client
      .db('JAM')
      .collection('carts')
      .deleteOne({ productId: id })
  } catch (err) {
    console.log(err.message);
  } finally {
    await client.close();
  }
};

// HYDRATE DB
export const hydrateDb = async (products) => {
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


export default client;
