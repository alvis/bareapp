/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Settings for capacitor
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2021 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'alvis.bareapp',
  appName: 'bareapp',
  bundledWebRuntime: false,
  loggingBehavior:
    // only log when the environment is clearly development
    process.env['NODE_ENV']?.toLowerCase() === 'development' ? 'debug' : 'none',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
  server: process.env['LIVE_RELOAD_URL']
    ? // provide a live reload URL during development
      {
        url: process.env['LIVE_RELOAD_URL'],
        cleartext: true,
      }
    : {},
  webDir: 'build',
};

export default config;
