import Decimal from 'decimal.js';
import { inject, injectable } from 'inversify';
import { Decimal128, MongoClient, ObjectId } from 'mongodb';
import { URL } from 'url';
import { Types } from '../di/types';
import { logger } from '../lib/logger';
import {
  AsyncInitializable,
  Disposer,
  Disposable,
  ASYNC_INIT,
} from '../lib/object-lifecycle';

export interface SkipLimit {
  /**
   * @default 0
   */
  skip?: number;
  limit: number;
}

@injectable()
export class MongodbConnectionService
  implements Disposable, AsyncInitializable
{
  readonly client: MongoClient;
  readonly connectionUrl: URL;
  readonly defaultDbName: string;
  readonly [ASYNC_INIT]: Promise<void>;
  get isDisposed() {
    return this.disposer.isDisposed;
  }
  private disposer: Disposer;

  constructor(@inject(Types.MongoDbConnectionString) connectionString: string) {
    this.client = new MongoClient(connectionString, {
      useUnifiedTopology: true,
      promiseLibrary: Promise,
    });
    this.connectionUrl = new URL(connectionString);
    this.defaultDbName =
      (this.connectionUrl.pathname[0] === '/'
        ? this.connectionUrl.pathname[0].slice(1)
        : this.connectionUrl.pathname[0]) || 'main';
    this.disposer = new Disposer(
      () => {
        return this.client.close().then(() => {
          logger.info('MongoDB disconnected');
        });
      },
      () => !this.client.isConnected()
    );
    this[ASYNC_INIT] = this.client
      .connect()
      .then((client) => {
        return this.client.db().command({
          ping: 1,
        });
      })
      .then(() => {
        logger.info('MongoDB connected');
      });
  }

  dispose(): Promise<void> {
    return this.disposer.dispose();
  }
}

export type MongoDbDocument<T> = {
  [K in keyof T]: T[K] extends Decimal ? Decimal128 : T[K];
};

export function toShallowDocument<
  T extends Record<string, any> = Record<string, any>
>(item: T): MongoDbDocument<T> {
  const document = {} as MongoDbDocument<T>;
  for (const prop in item) {
    if (!item.hasOwnProperty(prop)) {
      continue;
    }
    if ((item as any)[prop] instanceof Decimal) {
      (document as any)[prop] = decimalToDecimal128(item[prop]);
    } else {
      document[prop] = item[prop];
    }
  }
  return document;
}

export function decimalToDecimal128(decimal: Decimal): Decimal128 {
  return Decimal128.fromString(decimal.toString());
}

export function decimal128ToDecimal(decimal: Decimal128): Decimal {
  return new Decimal(decimal.toString());
}
