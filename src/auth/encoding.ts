/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Collection of encoding helpers
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { createHash } from 'crypto';

type Encoding =
  | 'utf8'
  | 'ascii'
  | 'utf-8'
  | 'utf16le'
  | 'ucs2'
  | 'ucs-2'
  | 'base64'
  | 'latin1'
  | 'binary'
  | 'hex';

/**
 * encode content in base64url (RFC4648)
 * @param content data to be encoded
 * @param options additional options
 * @param options.encoding encoding of the content
 * @returns encoded data
 */
export function base64URLEncode(
  content: string | Buffer,
  options?: {
    encoding?: Encoding;
  },
): string {
  const { encoding }: Required<NonNullable<typeof options>> = {
    encoding: 'utf8',
    ...options,
  };

  return (
    typeof content === 'string' ? Buffer.from(content, encoding) : content
  )
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * decode a base64 URL encoded content (RFC4648)
 * @param encoded the content to be decoded
 * @returns unencoded content
 */
export function base64URLDecode(encoded: string): Buffer {
  const PAD_LENGTH = 4;

  return Buffer.from(
    unescape(
      (encoded + '==='.slice((encoded.length + PAD_LENGTH - 1) % PAD_LENGTH))
        .replace(/-/g, '+')
        .replace(/_/g, '/'),
    ),
    'base64',
  );
}

/**
 * hash content with SHA256
 * @param content data to be hashed
 * @param options additional options
 * @param options.encoding encoding of the result
 * @returns hashed data in binary format
 */
export function sha256(
  content: string | Buffer,
  options?: {
    encoding?: 'base64' | 'hex';
  },
): string {
  const { encoding }: Required<NonNullable<typeof options>> = {
    encoding: 'hex',
    ...options,
  };

  return createHash('sha256').update(content).digest(encoding);
}
