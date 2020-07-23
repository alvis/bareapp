/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   A common storage interface
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

/** a common storage interface */
export abstract class StorePrototype {
  /**
   * get the key value
   * @param key key name
   * @returns key value
   */
  public abstract get(key: string): Promise<string | null>;

  /**
   * set the key value
   * @param key key name
   * @param value the value to be set to the key
   */
  public abstract set(key: string, value: string): Promise<void>;

  /**
   * delete everything from this key
   * @param key key name
   */
  public abstract remove(key: string): Promise<void>;

  /**
   * delete all content from the store
   */
  public abstract reset(): Promise<void>;
}
