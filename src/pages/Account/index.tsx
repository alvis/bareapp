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
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from '@ionic/react';
import { mailOpen } from 'ionicons/icons';
import React from 'react';

// import './Account.css';

import Private from '../../components/Private';

export default function Account(): ReturnType<React.FC> {
  return (
    <Private>
      {({ identity, logout }) => (
        <IonPage>
          <IonContent>
            <IonCard>
              <img alt="profile" src={identity.picture} />
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
            <IonButton color="danger" expand="block" onClick={logout}>
              Logout
            </IonButton>
          </IonContent>
        </IonPage>
      )}
    </Private>
  );
}
