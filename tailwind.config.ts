/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Configuration for tailwind
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2021 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import daisyui from 'daisyui';

export default {
  darkMode: 'class',
  mode: 'jit',
  plugins: [daisyui],
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
};
