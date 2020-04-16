export const Numbers = {};

Numbers.format = value => (Math.round(value * 10) / 10).toFixed(1);
