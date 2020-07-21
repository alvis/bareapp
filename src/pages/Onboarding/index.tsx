/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Onboarding page
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import {
  IonButton,
  IonContent,
  IonFooter,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useContext } from 'react';

export default function Onboarding(): ReturnType<React.FC> {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonTitle>Onboarding</IonTitle>
      </IonContent>
      <IonFooter className="ion-no-border">
        <IonToolbar>
          <IonButton expand="block" routerLink="/home">
            OK
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}
