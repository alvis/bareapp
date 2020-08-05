/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Collection of small helpers
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

/**
 * get an environment variable
 * @param name name of the variable
 * @returns value of the variable
 */
export function env(name: string): string {
  const value = process.env[name];

  // if (!value) {
  //   throw new Error(`${name} is undefined in the environment`);
  // }

  return value ?? 'ss';
}
