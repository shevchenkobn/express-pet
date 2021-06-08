import Decimal from 'decimal.js';
import { inject, injectable } from 'inversify';
import { Decimal128, MongoClient } from 'mongodb';
import { URL } from 'url';
import { Types } from '../di/types';
import { logger } from '../lib/logger';
import {
  AsyncInitializable,
  Disposer,
  Disposable,
  ASYNC_INIT,
} from '../lib/object-lifecycle';

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

export function toShallowDocument(item: Record<string, any>) {
  const document: Record<string, any> = {};
  for (const prop in item) {
    if (!item.hasOwnProperty(prop)) {
      continue;
    }
    if (item[prop] instanceof Decimal) {
      document[prop] = Decimal128.fromString(item[prop].toString());
    } else {
      document[prop] = item[prop];
    }
  }
  return document;
}
