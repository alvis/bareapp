/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Account Management
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonIcon,
  IonItem,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonLabel,
  IonList,
  IonPage,
} from '@ionic/react';
import React from 'react';

// import './Account.css';

import Header from '../../components/Header';
import Private from '../../components/Private';

import { mailOpen } from 'ionicons/icons';

export default function Account(): ReturnType<React.FC> {
  return (
    <Private>
      {({ identity, logout }) => (
        <IonPage>
          <Header title="Account" />
          <IonContent>
            <IonCard>
              <img src={identity.picture} alt="profile" />
              <IonCardHeader>
                <IonCardSubtitle>Welcome</IonCardSubtitle>
                <IonCardTitle>{identity.name}</IonCardTitle>
              </IonCardHeader>
              <IonList>
                <IonItem>
                  <IonIcon icon={mailOpen} slot="start" />
                  <IonLabel>{identity.email}</IonLabel>
                </IonItem>
              </IonList>
            </IonCard>
            <IonButton onClick={logout} color="danger" expand="block">
              Logout
            </IonButton>
          </IonContent>
        </IonPage>
      )}
    </Private>
  );
}
