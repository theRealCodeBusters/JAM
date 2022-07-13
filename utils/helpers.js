export const getAverage = array => {
  const sum = array.reduce((acc, curr) => acc + curr);
  return sum / array.length;
};

export const productsWithRating = (products, info) => {
  return products.map(product => {
    const productInfo = info.find(p => p.productId === product.id);
    return ({
      ...product,
      rating: getAverage(productInfo.ratings)
    })
  })
};

export const topNProducts = (products, info, amount) => {
  const ratedProducts = productsWithRating(products, info);
  ratedProducts.sort((a, b) => a.rating - b.rating);
  return ratedProducts.slice(0, amount);
};
