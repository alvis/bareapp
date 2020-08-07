/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Common header
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { cog } from 'ionicons/icons';
import React from 'react';

export default function Header({
  title,
}: {
  title?: string;
}): ReturnType<React.FC> {
  return (
    <IonHeader className="ion-no-border">
      <IonToolbar>
        <IonButtons slot="end">
          <IonButton routerLink="/navigation">
            <IonIcon icon={cog} />
          </IonButton>
        </IonButtons>
        {title ? <IonTitle>{title}</IonTitle> : null}
      </IonToolbar>
    </IonHeader>
  );
}
