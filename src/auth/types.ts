/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Collection of types related to authentication
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import type { Auth0UserProfile } from 'auth0-js';

/** collection of possible status with null for unknown */
export type AuthenticationStatus = Authenticated | UnAuthenticated;

/** collection of possible context structure with null for unknown */
export type AuthenticationContext =
  | AuthenticatedContext
  | UnAuthenticatedContext;

export interface Authenticated {
  isAuthenticated: true;
  accessToken: string;
  identity: Auth0UserProfile;
}

export interface AuthenticatedContext extends Authenticated {
  logout(): Promise<void>;
}

export interface UnAuthenticated {
  isAuthenticated: false;
}

export interface UnAuthenticatedContext extends UnAuthenticated {
  login(): Promise<void>;
}

export interface AuthenticationData {
  accessToken?: string;
  refreshToken?: string;
  expiry?: string;
}
