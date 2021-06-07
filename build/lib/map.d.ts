import { Maybe, NonOptional } from './types';
export interface ReadonlyGuardedMap<K, V> extends ReadonlyMap<K, NonOptional<V>> {
    get(key: K): NonOptional<V>;
    forEach(callbackfn: (value: NonOptional<V>, key: K, map: GuardedMap<K, V>) => void, thisArg?: any): void;
}
export interface IGuardedMap<K, V> extends ReadonlyGuardedMap<K, V> {
    set(key: K, value: NonOptional<V>): any;
}
export declare class GuardedMap<K, V> extends Map<K, NonOptional<V>> implements ReadonlyGuardedMap<K, V>, IGuardedMap<K, V> {
    constructor();
    constructor(entries: Maybe<Iterator<[K, NonOptional<V>]> | Iterable<[K, NonOptional<V>]>>, filterUndefined?: boolean);
    get(key: K): NonOptional<V>;
    set(key: K, value: NonOptional<V>): this;
    forEach(callbackfn: (value: NonOptional<V>, key: K, map: this) => void, thisArg?: any): void;
}
