export const getAverage = array => {
  if (!array.length) {
    return 0;
  }
  const sum = array.reduce((acc, curr) => acc + curr);
  return (sum / array.length).toFixed(2);
};

export const productsWithRating = (products, info) => {
  return products.map(product => {
    const productInfo = info.find(p => p.productId === product.id);
    return ({
      ...product,
      rating: getAverage(productInfo?.ratings)
    })
  })
};

export const topNProducts = (products, info, amount) => {
  const ratedProducts = productsWithRating(products, info);
  ratedProducts.sort((a, b) => b.rating - a.rating);
  return ratedProducts.slice(0, amount);
};

export const getTotalPrice = array => {
  return array.reduce((acc, curr) => acc + (curr.price * curr.amount), 0);
};

export const validatePromoCode = promoCode => {
  if (promoCode === 'SALT') {
    return 30;
  }
  return 0;
};
