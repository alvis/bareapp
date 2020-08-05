/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Login page
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
// import './Login.css';

import AuthenticationContext from '../../auth';

export default function Login(): ReturnType<React.FC> {
  const auth = useContext(AuthenticationContext);
  const history = useHistory();

  if (auth.isAuthenticated) {
    history.goBack();

    return null;
  } else {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonButton
            className="login-button"
            expand="block"
            onClick={async () => auth.login()}>
            Login
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }
}
