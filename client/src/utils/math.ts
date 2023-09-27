export function genRandomNumber(maximum = 3) {
  const randomDecimal = Math.random();
  const randomNumber = Math.floor(randomDecimal * maximum) + 1;

  return randomNumber;
}
