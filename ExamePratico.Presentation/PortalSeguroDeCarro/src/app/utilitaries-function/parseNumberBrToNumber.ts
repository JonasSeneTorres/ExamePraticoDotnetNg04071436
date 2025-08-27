// export function parseNumberBrToNumber(value: string): number {
//   if (!value) return 0;

//   return parseFloat(value.replace(/\./g, '').replace(',', '.'));
// }

export function parseNumberBrToNumber(value: string, decimals: number = 2): number {
  if (!value) return 0;
  // mantém só dígitos
  const digits = value.replace(/\D/g, '');
  if (!digits) return 0;

  const factor = Math.pow(10, decimals);
  return parseInt(digits, 10) / factor;
}
