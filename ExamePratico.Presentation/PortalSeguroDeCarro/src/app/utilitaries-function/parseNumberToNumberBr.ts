// export function parseNumberToNumberBr(value: number, decimais: number = 2): string {
//   if (value == null || isNaN(value)) return (0).toFixed(decimais).replace('.', ',');

//   return value
//     .toLocaleString('pt-BR', {
//       minimumFractionDigits: decimais,
//       maximumFractionDigits: decimais,
//     });
// }

export function parseNumberToNumberBr(value: number, decimals: number = 2): string {
  if (value == null || isNaN(value)) {
    return `0,${'0'.repeat(decimals)}`;
  }
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
