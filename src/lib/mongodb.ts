import Decimal from 'decimal.js';
import { ObjectId } from 'mongodb';

export function objectIdToDecimal(id: ObjectId): Decimal {
  return new Decimal('0x' + id.toHexString());
}
