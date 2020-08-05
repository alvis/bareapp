/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Helpers for opening an in-app browser for authentication
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { Device } from '@capacitor/device';
import { IosASWebauthenticationSession } from '@ionic-native/ios-aswebauthenticationsession-api';

const MIN_IOS_ASWebAuthenticationSession_VERSION = 12;

/** the origin of a callback */
export const origin = App.getInfo()
  .then(({ id }) => `${id}://${id}`)
  .catch(() => window.location.origin);

/** the url the IDP will call after authentication */
export const callbackURL = origin.then(
  (origin) => `${origin}/authentication/callback`,
);

/** the url the IDP call after the user has logged out from their side */
// export const returnURL = origin.then(
//   (origin) => `${origin}/authentication/logout`,
// );

/** A callback function listening for IDP's callback */
let resolveCallback: ((url: string) => void) | null = null;

App.addListener('appUrlOpen', async (info) => {
  const { pathname } = parseURL(info.url);

  // only process anything related to authentication
  switch (pathname) {
    case '/authentication/callback':
      return resolveCallback?.(info.url);
    default:
    // pass on any unrecognised path as they may be processed by other listeners
  }
});

/**
 * start signing in/out and return the result
 * @param url the authentication url to be opened
 * @returns the authentication result
 */
export async function authenticate(
  url: string,
): Promise<Record<string, unknown>> {
  const callback = await openAuthenticationURL(url);

  // assuming all data is embedded in the hash
  const { hash } = parseURL(callback);
  const parameter = new URLSearchParams(hash?.replace(/^#/, ''));

  return Object.fromEntries(parameter.entries());
}

/**
 * open an authentication related URL at the right place
 * @param url the authentication URL to be opened
 * @returns the callback from the IDP
 */
async function openAuthenticationURL(url: string): Promise<string> {
  const { operatingSystem, osVersion } = await Device.getInfo();
  const [majorOSVersion] = osVersion.split('.');

  switch (operatingSystem) {
    case 'ios':
      return Number(majorOSVersion) < MIN_IOS_ASWebAuthenticationSession_VERSION
        ? openURLWithNativeWebView(url)
        : openURLWithASWebauthenticationSession(url);
    default:
      // open the URL on a system browser for android, or on the same tab for web
      return openURLWithNativeWebView(url);
  }
}

/**
 * open an in-app browser via ASWebauthenticationSession
 * @param url the authentication URL to be opened
 * @returns the full callback URL called by the IDP
 */
async function openURLWithASWebauthenticationSession(
  url: string,
): Promise<string> {
  // open the browser and wait for a URL is called with the app's specific protocol (e.g. my.app://callback)
  const { id: protocol } = await App.getInfo();
  const callback = await IosASWebauthenticationSession.start(protocol, url);

  if (callback) {
    return callback;
  } else {
    throw new Error('authentication_canceled');
  }
}

/**
 * open a native in-app browser and wait for a callback via custom scheme URI
 * @param url the authentication URL to be opened
 * @returns the callback from the IDP
 */
async function openURLWithNativeWebView(url: string): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    try {
      Browser.removeAllListeners();
      Browser.addListener('browserFinished', () => {
        Browser.removeAllListeners();
        resolveCallback = null;
        reject(new Error('authentication_canceled'));
      });

      // export the callback so that it can be resolved via the deep link listener
      resolveCallback = resolve;

      // open the browser for authentication
      await Browser.open({
        url,
        presentationStyle: 'popover',
      });
    } catch (error) {
      reject(error);
      resolveCallback = null;
    }
  }).finally(
    // close the browser regardless of the result
    () =>
      Browser.close().catch(
        // the close method is not implemented on android, but it doesn't better
        () => undefined,
      ),
  );
}

/**
 * parse an URL and returns different parts of it
 * @param url the URL to be parsed
 * @returns parts of the parsed URL
 */
function parseURL(url: string): {
  origin: string;
  pathname?: string;
  hash?: string;
} {
  // funny enough, the URL class in android fail to parse a URL with a custom scheme, so fallback to regex
  const [_, origin, pathname, hash] =
    /([\w.]+:\/\/[\w.]+)?(\/[^#]+)(#.*)?/.exec(url)!;

  return { origin, pathname, hash };
}
