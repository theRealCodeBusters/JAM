export const getAverage = array => {
  const sum = array.reduce((acc, curr) => acc + curr);
  return sum / array.length;
};
