/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   A page component for authorised content
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import React from 'react';

import Authentication from '../../auth';

import Login from '../../pages/Login';

import type { AuthenticatedContext } from '../../auth';

export default function Private({
  children,
}: {
  children?:
    | ((value: AuthenticatedContext) => React.ReactNode)
    | React.ReactText
    | React.ReactFragment
    | boolean
    | null
    | undefined;
}): ReturnType<React.FC> {
  return (
    <Authentication.Consumer>
      {(auth) => (
        <>
          {auth.isAuthenticated ? (
            children instanceof Function ? (
              children(auth)
            ) : (
              children
            )
          ) : (
            <Login />
          )}
        </>
      )}
    </Authentication.Consumer>
  );
}
