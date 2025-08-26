export function parseCurrencyToNumber(value: string): number {
  if (!value) return 0;

  // Remove tudo que não seja dígito ou vírgula
  let numericString = value.replace(/[^\d,]/g, '');

  // Substitui a vírgula por ponto para parseFloat
  numericString = numericString.replace(',', '.');

  // Converte para número
  const numberValue = parseFloat(numericString);

  return isNaN(numberValue) ? 0 : numberValue;
}
