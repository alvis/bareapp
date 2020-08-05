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

import { SplashScreen } from '@capacitor/splash-screen';
import { IonApp, IonLoading, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

import AuthenticationContext, { useAuth } from './auth';
import PreferenceContext, { usePreference } from './preference';

import Home from './pages/Home';
import Onboarding from './pages/Onboarding';

/**
 * hide the splash screen when all states are ready
 * @param states list of states which could be null
 * @returns indicates whether all the background loads are ready
 */
function useAutohideSplashScreen(...states: unknown[]): boolean {
  const isReady = states.every((state) => !!state);
  useEffect(() => {
    if (isReady) {
      void SplashScreen.hide();
    }
  }, [isReady]);

  return isReady;
}

export default function App(): ReturnType<React.FC> {
  const auth = useAuth();
  const preference = usePreference();

  // hide the splash screen when the app is ready to load
  const isReady = useAutohideSplashScreen(true);

  return !isReady || !auth || !preference ? (
    <IonLoading isOpen={true} />
  ) : (
    <AuthenticationContext.Provider value={auth}>
      <PreferenceContext.Provider value={preference}>
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet id="main">
              <Route path="/home" component={Home} />
              <Route path="/onboarding" component={Onboarding} />
              <Redirect
                exact
                from="/"
                to={preference.showOnboarding ? '/onboarding' : '/home'}
              />
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </PreferenceContext.Provider>
    </AuthenticationContext.Provider>
  );
}
