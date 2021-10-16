/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Configuration for postcss
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2021 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

import tailwindcssConfig from './tailwind.config';

export default { plugins: [autoprefixer, tailwindcss(tailwindcssConfig)] };
