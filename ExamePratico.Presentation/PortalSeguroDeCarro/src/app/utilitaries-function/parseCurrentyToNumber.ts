export function parseCurrencyToNumber(value: string): number {
  if (!value) return 0;

  let numericString = value.replace(/[^\d,]/g, '');
  numericString = numericString.replace(',', '.');
  const numberValue = parseFloat(numericString);

  return isNaN(numberValue) ? 0 : numberValue;
}
