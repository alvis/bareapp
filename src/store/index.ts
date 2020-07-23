/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   A secure store manager
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { NativeStore } from './native';
import { SecureStore } from './secure';

import type { StorePrototype } from './prototype';

export * from './prototype';
export * from './native';
export * from './secure';

interface StoreOptions<Structure> {
  name: string;
  type: 'native' | 'secure';
  defaultState: NonNullable<Structure>;
}

/** store manager */
export class Store<Structure> {
  private options: StoreOptions<Structure>;

  private store: StorePrototype;

  /**
   * create a store instance
   * @param options store options
   */
  constructor(options: StoreOptions<Structure>) {
    this.options = options;
    this.store = this.getStore(options.type);
  }

  /**
   * get the current state
   * @returns current state
   */
  public async read(): Promise<Structure> {
    return (await this.readFromStore()) ?? this.options.defaultState;
  }

  /**
   * update part of the data stored in the store
   * @param value date to be updated
   */
  public async update(value: Partial<Structure>): Promise<void> {
    const state = await this.read();

    await this.store.set(
      this.options.name,
      JSON.stringify({ ...state, ...value }),
    );
  }

  /**
   * remove all data from the store
   */
  public async reset(): Promise<void> {
    await this.store.reset();
  }

  /**
   * get a new store API instance according to the type
   * @param type store type
   * @returns a store instance
   */
  private getStore(type: string): StorePrototype {
    switch (type) {
      case 'secure':
        return new SecureStore();
      default:
        return new NativeStore();
    }
  }

  /**
   * read the data stored in the store
   * @returns stored data
   */
  private async readFromStore(): Promise<Structure | null> {
    try {
      const stringifiedState = (await this.store.get(this.options.name)) ?? '';

      return JSON.parse(stringifiedState) as Structure;
    } catch {
      return null;
    }
  }
}
