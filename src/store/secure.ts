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

import { App } from '@capacitor/app';
import { Device } from '@capacitor/device';

import { SecureStorage } from '@ionic-native/secure-storage';

import { StorePrototype } from './prototype';

import type { SecureStorageObject } from '@ionic-native/secure-storage';

/** a low level interface for handling the native secure store */
export class SecureStore extends StorePrototype {
  /** the underlying secure store API */
  private store: Promise<SecureStorageObject> = App.getInfo()
    .then(async ({ id }) => SecureStorage.create(id))
    // use a random UUID for web
    .catch(() => Device.getId().then(({ uuid }) => SecureStorage.create(uuid)));

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
    window.alert('setting ' + key + value);
    const store = await this.store;
    window.alert('done');
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
