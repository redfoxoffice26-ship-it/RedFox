/**
 * Currency configuration for RED FOX Footwear
 * Exclusively uses BDT (Bangladeshi Taka) currency only.
 */

export const CURRENCY_CODE = 'BDT';
export const CURRENCY_NAME = 'Bangladeshi Taka';
export const CURRENCY_SYMBOL = '৳';

/**
 * Format any numerical price strictly in BDT currency.
 * Returns e.g. "BDT 185" or "BDT 185.00"
 */
export function formatBDT(amount: number, forceDecimals: boolean = false): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 'BDT 0';
  }
  if (forceDecimals || amount % 1 !== 0) {
    return `BDT ${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  return `BDT ${amount.toLocaleString('en-US')}`;
}

export const formatPrice = formatBDT;
