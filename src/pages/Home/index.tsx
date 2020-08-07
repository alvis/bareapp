/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Home page
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { IonContent, IonPage, IonTitle } from '@ionic/react';
import React from 'react';

import Header from '../../components/Header';
import Private from '../../components/Private';

export default function Home(): ReturnType<React.FC> {
  return (
    <Private>
      <IonPage id="home">
        <Header />
        <IonContent fullscreen>
          <IonTitle>Hello World</IonTitle>
        </IonContent>
      </IonPage>
    </Private>
  );
}
