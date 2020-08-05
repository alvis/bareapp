/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { WebAuth } from 'auth0-js';
import { randomBytes } from 'crypto';
import { EventEmitter } from 'events';
import { promisify } from 'util';

import { Store } from '../store';
import { env } from '../utilities';
import { authenticate, callbackURL } from './browser';
import { base64URLEncode, sha256 } from './encoding';

import type { AuthenticationData, AuthenticationStatus } from './types';
import type { AuthorizeUrlOptions } from 'auth0-js';

const { client } = new WebAuth({
  domain: env('REACT_APP_AUTH0_DOMAIN'),
  clientID: env('REACT_APP_AUTH0_CLIENT_ID'),
  responseType: 'code',
  scope: 'openid offline profile email',
});

interface PKCE {
  /** PKCE challenger */
  challenger: string;
  /** PKCE verifier */
  verifier: string;
}

interface TokenResponse {
  /** the access token */
  accessToken: string;
  /** seconds till the token will be expired */
  expiresIn: number;
}

/**
 *
 */
class Authenticator extends EventEmitter {
  /** the secure store storing the authentication data */
  private store = new Store<AuthenticationData>({
    name: 'auth',
    type: 'secure',
    defaultState: {},
  });

  /** PKCE pair */
  private pkce: PKCE = this.newPKCE();

  /**
   * open an in-app browser to perform authentication
   */
  public async authenticate(): Promise<void> {
    const { challenger } = this.newPKCE();

    const url = client.buildAuthorizeUrl({
      redirectUri: await callbackURL,
      responseType: 'code id_token',
      state: challenger,
      nonce: challenger,
      codeChallenge: challenger,
      codeChallengeMethod: 'S256',
    } as AuthorizeUrlOptions);

    await this.handleCallback(await authenticate(url));
  }

  /**
   * get the current authentication status
   * @returns current authentication status
   */
  public async getStatus(): Promise<AuthenticationStatus> {
    const auth = await this.store.read();

    const accessToken =
      auth.expiry && new Date(auth.expiry) > new Date()
        ? auth.accessToken
        : auth.refreshToken
        ? await this.refresh(auth.refreshToken)
        : null;

    return accessToken
      ? {
          isAuthenticated: true,
          accessToken,
          identity: await promisify(client.userInfo.bind(client))(accessToken),
        }
      : {
          isAuthenticated: false,
        };
  }

  /**
   * check the code and state from the IDP's callback and update the state
   * @param response the response returned from the IDP at the end of the flow
   */
  public async handleCallback(
    response: Record<string, unknown>,
  ): Promise<void> {
    const { code, error, state } = response;

    // check CSRF
    if (state !== this.pkce.challenger) {
      throw new Error('authentication_state_mismatch');
    }

    // convert an error message to an actual error
    if (typeof error === 'string') {
      throw new Error(`authentication_${error}`);
    }

    if (typeof code !== 'string') {
      throw new Error(`authentication_missing_code`);
    }

    await this.code(code);
  }

  /**
   * clear all access tokens and reset state
   */
  public async logout(): Promise<void> {
    const logoutURL = client.buildLogoutUrl({
      returnTo: await callbackURL,
    });

    await authenticate(logoutURL);

    await this.store.reset();
    this.emit('status', await this.getStatus());
  }

  /**
   * generate a new PKCE pair
   * @returns a new PKCE pair
   */
  private newPKCE(): PKCE {
    const BIT256 = 32;
    const verifier = base64URLEncode(randomBytes(BIT256));
    const challenger = base64URLEncode(
      sha256(verifier, { encoding: 'base64' }),
      { encoding: 'base64' },
    );

    this.pkce = {
      challenger,
      verifier,
    };

    return this.pkce;
  }

  /**
   * get an access token by an authorization code
   * @param code the authorization code
   * @returns a new access token
   */
  private async code(code: string): Promise<string> {
    const token = await this.token({
      grantType: 'authorization_code',
      code,
      codeVerifier: this.pkce.verifier,
      redirectUri: await callbackURL,
    });

    this.emit('status', await this.getStatus());

    return token;
  }

  /**
   * get an access token by a refresh token
   * @param token the refresh token
   * @returns a new access token
   */
  private async refresh(token: string): Promise<string> {
    return this.token({
      type: 'refresh',
      token,
    });
  }

  /**
   * send a request to the token endpoint and store the tokens
   * @param payload payload to the token endpoint
   * @returns the access token
   */
  private async token(payload: Record<string, string>): Promise<string> {
    try {
      const response = (await promisify(client.oauthToken.bind(client))(
        payload,
      )) as TokenResponse;

      const { accessToken, expiresIn } = response;

      const MILLSECONDS = 1000;
      window.alert('tokendd' + accessToken);
      await this.store.update({
        accessToken,
        expiry: new Date(Date.now() + expiresIn * MILLSECONDS).toISOString(),
      });

      window.alert('saved');

      return accessToken;
    } catch (error) {
      const { code, message } = error as { code?: string; message?: string };

      throw new Error(
        `failed to retrieve or save the access token: ${
          code ?? message ?? 'unknown error'
        }`,
      );
    }
  }
}

export const authenticator = new Authenticator();
