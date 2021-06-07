import { iterate } from 'iterare';
import { Maybe, NonOptional } from './types';

export interface ReadonlyGuardedMap<K, V>
  extends ReadonlyMap<K, NonOptional<V>> {
  get(key: K): NonOptional<V>;
  forEach(
    callbackfn: (value: NonOptional<V>, key: K, map: GuardedMap<K, V>) => void,
    thisArg?: any
  ): void;
}

export interface IGuardedMap<K, V> extends ReadonlyGuardedMap<K, V> {
  set(key: K, value: NonOptional<V>): any;
}

export class GuardedMap<K, V>
  extends Map<K, NonOptional<V>>
  implements ReadonlyGuardedMap<K, V>, IGuardedMap<K, V>
{
  constructor();
  constructor(
    entries: Maybe<
      Iterator<[K, NonOptional<V>]> | Iterable<[K, NonOptional<V>]>
    >,
    filterUndefined?: boolean
  );
  constructor(
    entries?: Maybe<
      Iterator<[K, NonOptional<V>]> | Iterable<[K, NonOptional<V>]>
    >,
    filterUndefined = false
  ) {
    super(
      entries !== undefined && entries !== null
        ? (toGuardedMapIterable(entries, filterUndefined) as any)
        : null
    );
  }

  get(key: K): NonOptional<V> {
    const value = super.get(key);
    if (value === undefined) {
      throw new TypeError(`key ${key} is not found in the map`);
    }
    return value;
  }

  set(key: K, value: NonOptional<V>): this {
    if (value === undefined) {
      throwMapSetError(key, value);
    }
    return super.set(key, value);
  }

  forEach(
    callbackfn: (value: NonOptional<V>, key: K, map: this) => void,
    thisArg?: any
  ) {
    return super.forEach(callbackfn as any, thisArg);
  }
}
function toGuardedMapIterable<K, V>(
  entries: Iterator<[K, V]> | Iterable<[K, V]>,
  filterUndefined = false
): Iterable<[K, NonOptional<V>]> {
  return filterUndefined
    ? iterate(entries).filter((pair) => pair[1] !== undefined)
    : (iterate(entries).map((pair) => {
        if (pair[1] === undefined) {
          throwMapSetError(pair[0], pair[1]);
        }
        return pair;
      }) as any);
}
function throwMapSetError<K, V>(key: K, value: V): never {
  throw new TypeError(`value ${value} for key ${key} is undefined`);
}
