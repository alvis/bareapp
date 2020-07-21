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

import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import Home from './pages/Home';
import Onboarding from './pages/Onboarding';

export default function App(): ReturnType<React.FC> {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/onboarding" component={Onboarding} />
          <Route path="/home" component={Home} />
          <Redirect exact from="/" to="/onboarding" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}
