export default function priceStringToDouble(value: string) {
  if (value.length <= 0) return 0.00

  return Number(value.replaceAll('R$', '').replaceAll('.', '').replaceAll(',', '.').trim());
}