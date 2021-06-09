import Decimal from 'decimal.js';
import { ReadonlyDate } from 'readonly-date';
import { GuardedMap, ReadonlyGuardedMap } from './map';

export type primitive = number | string | boolean | symbol | bigint;
export type Maybe<T> = T | null | undefined;
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type NonOptional<T> = T extends undefined ? never : T;
export type AsInterface<C> = {
  [K in keyof C]: C[K];
};

export const asReadonly = Symbol('asReadonly');

export interface ReadonlyMarker<RT> {
  /**
   * WARNING: This symbol is used for compile time checks and is unsafe to read.
   *   You can read it only if you are sure that the type that implements the
   *   interface allows you to.
   */
  [asReadonly]: RT;
}

export type DeepReadonly<T> = T extends ReadonlyMarker<infer RT>
  ? T[typeof asReadonly]
  : T extends Decimal
  ? T
  : T extends ReadonlyDate
  ? ReadonlyDate
  : T extends ReadonlyGuardedMap<infer K, infer V>
  ? DeepReadonlyGuardedMap<K, V>
  : T extends ReadonlyMap<infer K, infer V>
  ? DeepReadonlyMap<K, V>
  : T extends ReadonlySet<infer V>
  ? DeepReadonlySet<V>
  : T extends ReadonlyArray<infer V>
  ? DeepReadonlyArray<V>
  : DeepReadonlyObject<T>;
export type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type DeepReadonlyArray<T> = ReadonlyArray<DeepReadonly<T>>;

export type DeepReadonlySet<T> = ReadonlySet<DeepReadonly<T>>;

export type DeepReadonlyMap<K, V> = ReadonlyMap<
  DeepReadonly<K>,
  DeepReadonly<V>
>;
export type DeepReadonlyGuardedMap<K, V> = ReadonlyGuardedMap<
  DeepReadonly<K>,
  DeepReadonly<V>
>;

export const asPartial = Symbol('asPartial');

export interface PartialMarker<P> {
  /**
   * WARNING: This symbol is used for compile time checks and is unsafe to read.
   *   You can read it only if you are sure that the type that implements the
   *   interface allows you to.
   */
  [asPartial]: P;
}

export type DeepPartial<T> = T extends PartialMarker<infer PT>
  ? T[typeof asPartial]
  : T extends Decimal
  ? T
  : T extends GuardedMap<infer K, infer V>
  ? T
  : T extends Map<infer K, infer V>
  ? Map<DeepPartial<K>, DeepPartial<V>>
  : T extends Set<infer V>
  ? Set<DeepPartial<V>>
  : T extends (infer V)[]
  ? DeepPartial<V>[]
  : DeepPartialObject<T>;
export type DeepPartialObject<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export function t<A>(...args: [A]): [A];
export function t<A, B>(...args: [A, B]): [A, B];
export function t<A, B, C>(...args: [A, B, C]): [A, B, C];
export function t(...args: any[]): any[] {
  return args;
}

export function as<T>(value: any): value is T {
  return true;
}
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function cast<T>(value: any): asserts value is T {}
