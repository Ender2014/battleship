export function roundToTwoDecimals(num) {
  return +Math.round((num + Number.EPSILON) * 100) / 100;
}

export function isFloat(n) {
  return n % 1 !== 0;
}
