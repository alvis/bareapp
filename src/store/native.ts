/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   A low level interface for handling the native store
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { Storage } from '@capacitor/storage';

import { StorePrototype } from './prototype';

/** a low level interface for handling the native store */
export class NativeStore extends StorePrototype {
  /**
   * get the key value
   * @param key key name
   * @returns key value
   */
  public async get(key: string): Promise<string | null> {
    const { value } = await Storage.get({ key });

    return value;
  }

  /**
   * set the key value
   * @param key key name
   * @param value the value to be set to the key
   */
  public async set(key: string, value: string): Promise<void> {
    await Storage.set({ key, value });
  }

  /**
   * delete everything from this key
   * @param key key name
   */
  public async remove(key: string): Promise<void> {
    await Storage.remove({ key });
  }

  /**
   * delete all content from the store
   */
  public async reset(): Promise<void> {
    await Storage.clear();
  }
}
