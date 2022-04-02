const numberPrettyPrint = (number: number) => {
  if (number < 10) return `0${number}`;

  return number.toString();
};
export const datePrettyPrint = (expiration) =>
  `${expiration.getFullYear()}-${numberPrettyPrint(
    expiration.getMonth()
  )}-${numberPrettyPrint(expiration.getDay())}`;
