import { inject, injectable } from 'inversify';
import { MongoClient } from 'mongodb';
import { TYPES } from '../di/types';
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
  [ASYNC_INIT]: Promise<void>;
  get isDisposed() {
    return this.disposer.isDisposed;
  }
  private disposer: Disposer;

  constructor(
    @inject(TYPES.MongoDbConnectionString) private connectionString: string
  ) {
    this.client = new MongoClient(this.connectionString);
    this.disposer = new Disposer(
      () => {
        return this.client.close();
      },
      () => !this.client.isConnected()
    );
    this[ASYNC_INIT] = this.client.connect().then((client) => {
      return this.client.db().command({
        ping: 1,
      });
    });
  }

  dispose(): Promise<void> {
    return this.disposer.dispose();
  }
}
