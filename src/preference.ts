/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Context for settings
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import React, { useCallback, useEffect, useState } from 'react';

import { Store } from './store';

interface Preference {
  showOnboarding: boolean;
}

interface PreferenceContext extends Preference {
  update(value: Partial<Preference>): Promise<void>;
}

const defaultPreference: Preference = {
  showOnboarding: true,
};

const store = new Store<Preference>({
  name: 'preference',
  type: 'native',
  defaultState: defaultPreference,
});

export default React.createContext<PreferenceContext>({
  ...defaultPreference,
  update: async () => Promise.resolve(),
});

/**
 * a react custom hook for getting preferences
 * @returns current status and auxiliary helpers
 */
export function usePreference(): PreferenceContext | null {
  const [preference, setPreference] = useState<Preference | null>(null);

  const update = useCallback(
    async (value: Partial<Preference>): Promise<void> => {
      await store.update(value);
      setPreference(await store.read());
    },
    [],
  );

  useEffect(() => {
    void store.read().then(setPreference);
  }, [
    // only run once on the first render (using updatePreference as an indicator)
    update,
  ]);

  return preference === null
    ? preference
    : {
        ...preference,
        update,
      };
}
