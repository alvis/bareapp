/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Collection of helper for handling the authentication context
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { Plugins } from '@capacitor/core';
import React, { useEffect, useState } from 'react';

import type { AuthenticationContext, AuthenticationStatus } from './types';
import { authenticator } from './authenticator';

export default React.createContext<AuthenticationContext>({
  isAuthenticated: false,
  login: async () => Promise.resolve(),
});

/**
 * handle error thrown during authentication
 * @param error the error thrown
 */
async function handleError(error: Error): Promise<void> {
  await Plugins.Modals.alert({
    title: 'Authenn Error',
    message: error.message,
  });
}

/**
 * a react custom hook for getting authentication status
 * @returns current status and auxiliary helpers
 */
export function useAuth(): AuthenticationContext | null {
  const [status, setStatus] = useState<AuthenticationStatus | null>(null);

  useEffect(() => {
    authenticator.on('status', setStatus);
    void authenticator.getStatus().then(setStatus);

    return () => {
      authenticator.removeListener('status', setStatus);
    };
  }, [
    // only run once on the first render (using setStatus as an indicator)
    setStatus,
  ]);

  return status === null
    ? status
    : status.isAuthenticated
    ? {
        ...status,
        logout: async () => authenticator.logout().catch(handleError),
      }
    : {
        ...status,
        login: async () => authenticator.authenticate().catch(handleError),
      };
}
