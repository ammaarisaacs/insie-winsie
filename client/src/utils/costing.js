export const formatPrice = (number) => {
  if (typeof number === "number" && !Number.isNaN(number)) {
    return number.toFixed(2);
  }
};

export const randify = (indicator) => {
  if (typeof indicator === "number" && !Number.isNaN(indicator)) {
    return `R ${indicator.toFixed(2)}`;
  }
};
