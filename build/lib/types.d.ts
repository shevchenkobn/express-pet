import { ReadonlyDate } from 'readonly-date';
import { GuardedMap, ReadonlyGuardedMap } from './map';
export declare type primitive = number | string | boolean | symbol | bigint;
export declare type Maybe<T> = T | null | undefined;
export declare type Nullable<T> = T | null;
export declare type Optional<T> = T | undefined;
export declare type NonOptional<T> = T extends undefined ? never : T;
export declare const asReadonly: unique symbol;
export interface ReadonlyMarker<RT> {
    [asReadonly]: RT;
}
export declare type DeepReadonly<T> = T extends ReadonlyMarker<infer RT> ? T[typeof asReadonly] : T extends Date ? ReadonlyDate : T extends ReadonlyGuardedMap<infer K, infer V> ? DeepReadonlyGuardedMap<K, V> : T extends ReadonlyMap<infer K, infer V> ? DeepReadonlyMap<K, V> : T extends ReadonlySet<infer V> ? DeepReadonlySet<V> : T extends ReadonlyArray<infer V> ? DeepReadonlyArray<V> : DeepReadonlyObject<T>;
export declare type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};
export declare type DeepReadonlyArray<T> = ReadonlyArray<DeepReadonly<T>>;
export declare type DeepReadonlySet<T> = ReadonlySet<DeepReadonly<T>>;
export declare type DeepReadonlyMap<K, V> = ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>;
export declare type DeepReadonlyGuardedMap<K, V> = ReadonlyGuardedMap<DeepReadonly<K>, DeepReadonly<V>>;
export declare const asPartial: unique symbol;
export interface PartialMarker<P> {
    [asPartial]: P;
}
export declare type DeepPartial<T> = T extends PartialMarker<infer PT> ? T[typeof asPartial] : T extends GuardedMap<infer K, infer V> ? GuardedMap<DeepPartial<K>, DeepPartial<V>> : T extends Map<infer K, infer V> ? Map<DeepPartial<K>, DeepPartial<V>> : T extends Set<infer V> ? Set<DeepPartial<V>> : T extends (infer V)[] ? DeepPartial<V>[] : T extends ReadonlyGuardedMap<infer K, infer V> ? ReadonlyGuardedMap<DeepPartial<K>, DeepPartial<V>> : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepPartial<K>, DeepPartial<V>> : T extends ReadonlySet<infer V> ? ReadonlySet<DeepPartial<V>> : T extends ReadonlyArray<infer V> ? ReadonlyArray<DeepPartial<V>> : DeepPartialObject<T>;
export declare type DeepPartialObject<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
export declare type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
export declare function t<A>(...args: [A]): [A];
export declare function t<A, B>(...args: [A, B]): [A, B];
export declare function t<A, B, C>(...args: [A, B, C]): [A, B, C];
export declare function as<T>(value: any): value is T;
export declare function cast<T>(value: any): asserts value is T;
