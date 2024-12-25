export const BILL_DENOMINATIONS = {
  2000: 0,
  1000: 0,
  500: 0,
  200: 0,
  100: 0,
  50: 0,
  20: 0,
  10: 0,
  5: 0,
} as const;

export type BillDenominations = typeof BILL_DENOMINATIONS;
export type BillValue = keyof typeof BILL_DENOMINATIONS;

export const ORDERED_DENOMINATIONS: BillValue[] = [
  2000,
  1000,
  500,
  200,
  100,
  50,
  20,
  10,
  5,
];
