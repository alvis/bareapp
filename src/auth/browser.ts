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

import { Plugins } from '@capacitor/core';
import { IosASWebauthenticationSession } from '@ionic-native/ios-aswebauthenticationsession-api';

/** the url the IDP supposed to call after authentication */
export const callbackURL = Plugins.Device.getInfo().then(
  ({ appId }) => `${appId}://authentication/callback`,
);

/** the url the IDP will redirect the use back after logout */
export const returnURL = Plugins.Device.getInfo().then(
  ({ appId }) => `${appId}://authentication/logout`,
);

/** A callback function listening for IDP's callback */
let callback: ((url: string) => void) | null = null;

Plugins.App.addListener('appUrlOpen', async (info) => {
  const url = new URL(info.url);

  // only process anything related to authentication
  if (url.host === 'authentication') {
    switch (url.pathname) {
      case 'callback':
        return callback?.(info.url);
      // case 'logout':
      // no callback need to be called as the promise is resolved when the page is loaded
      default:
      // do nothing for unrecognised path
    }
  }
});

/**
 * open a native in-app browser and wait for a callback via custom scheme URI
 * @param url the authentication URL to be opened
 * @returns the callback from the IDP
 */
async function openAuthURLWithNativeWebView(url: string): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    try {
      Plugins.Browser.removeAllListeners();
      Plugins.Browser.addListener('browserFinished', () => {
        Plugins.Browser.removeAllListeners();
        callback = null;
        reject(new Error('authentication_canceled'));
      });
      callback = resolve;
      await Plugins.Browser.open({ url, presentationStyle: 'popover' });
    } catch (error) {
      reject(error);
      callback = null;
    }
  });
}

/**
 * open an in-app browser via ASWebauthenticationSession
 * @param url the authentication URL to be opened
 * @returns the callback from the IDP
 */
async function openAuthURLWithASWebauthenticationSession(
  url: string,
): Promise<string> {
  const callback = await IosASWebauthenticationSession.start(
    await callbackURL,
    url,
  );

  if (callback) {
    return callback;
  } else {
    throw new Error('authentication_canceled');
  }
}

/**
 * open an in-app browser for authentication
 * @param url the authentication URL to be opened
 * @returns the callback from the IDP
 */
async function startAuthenticate(url: string): Promise<string> {
  const { operatingSystem, osVersion } = await Plugins.Device.getInfo();
  const [majorOSVersion] = osVersion.split('.');

  switch (operatingSystem) {
    case 'ios':
      switch (majorOSVersion) {
        case '12':
        case '13':
          return openAuthURLWithASWebauthenticationSession(url);
        default:
          return openAuthURLWithNativeWebView(url);
      }
    default:
      return openAuthURLWithNativeWebView(url);
  }
}

/**
 * start authenticate and return the result
 * @param url the authentication url to be opened
 * @returns the authentication result
 */
export async function authenticate(
  url: string,
): Promise<Record<string, unknown>> {
  const callback = await startAuthenticate(url);
  const parameter = new URLSearchParams(
    new URL(callback).hash.replace(/^#/, ''),
  );

  return Object.fromEntries(parameter.entries());
}

/**
 * open a native in-app browser to clear the user session
 * @param url the logout url to be opened
 */
async function openLogoutURLWithNativeWebView(url: string): Promise<void> {
  await new Promise<void>(async (resolve, reject) => {
    Plugins.Browser.removeAllListeners();
    Plugins.Browser.addListener('browserPageLoaded', () => {
      Plugins.Browser.removeAllListeners();
      resolve(Plugins.Browser.close());
    });
    Plugins.Browser.addListener('browserFinished', () => {
      Plugins.Browser.removeAllListeners();
      reject();
    });
    await Plugins.Browser.open({ url });
  });
}

/**
 * open an in-app browser via ASWebauthenticationSession
 * @param url the authentication URL to be opened
 * @returns the callback from the IDP
 */
async function openLogouURLWithASWebauthenticationSession(
  url: string,
): Promise<void> {
  try {
    await IosASWebauthenticationSession.start(await returnURL, url);
  } catch {
    throw new Error('authentication_canceled');
  }
}

/**
 * logout a user using the native in-app browser
 * @param url the logout URL to be opened
 */
export async function logout(url: string): Promise<void> {
  const { operatingSystem, osVersion } = await Plugins.Device.getInfo();
  const [majorOSVersion] = osVersion.split('.');

  switch (operatingSystem) {
    case 'ios':
      switch (majorOSVersion) {
        case '12':
        case '13':
          await openLogouURLWithASWebauthenticationSession(url);
          break;
        default:
          await openLogoutURLWithNativeWebView(url);
      }
      break;
    default:
      await openLogoutURLWithNativeWebView(url);
  }
}
