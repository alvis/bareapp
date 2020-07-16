/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Application Controller
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { IonApp } from '@ionic/react';
import React from 'react';

import Home from './pages/Home';

export default function App(): ReturnType<React.FC> {
  return (
    <IonApp>
      <Home />
    </IonApp>
  );
}
