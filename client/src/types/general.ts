import { ValueOf } from "../utils/types";

export const qr = 'qr';
export const barcode = 'barcode';

export const cardTypes = {
  barcode,
  qr,
} as const;

export type CardType = ValueOf<typeof cardTypes>;
