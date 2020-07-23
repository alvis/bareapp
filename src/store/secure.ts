/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   A low level interface for handling the native secure store
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { Plugins } from '@capacitor/core';
import {
  SecureStorage,
  SecureStorageObject,
} from '@ionic-native/secure-storage';

import { StorePrototype } from './prototype';

/** a low level interface for handling the native secure store */
export class SecureStore extends StorePrototype {
  /** the underlying secure store API */
  private store: Promise<
    SecureStorageObject
  > = Plugins.Device.getInfo().then(async (info) =>
    SecureStorage.create(info.appId),
  );

  /**
   * get the key value
   * @param key key name
   * @returns key value
   */
  public async get(key: string): Promise<string | null> {
    const store = await this.store;

    return (await store.keys()).includes(key) ? store.get(key) : null;
  }

  /**
   * set the key value
   * @param key key name
   * @param value the value to be set to the key
   */
  public async set(key: string, value: string): Promise<void> {
    const store = await this.store;
    await store.set(key, value);
  }

  /**
   * delete everything from this key
   * @param key key name
   */
  public async remove(key: string): Promise<void> {
    const store = await this.store;
    await store.remove(key);
  }

  /**
   * delete all content from the store
   */
  public async reset(): Promise<void> {
    const store = await this.store;
    await store.clear();
  }
}
