import { createStore } from 'zustand-x';

import { TUsersData } from '@/types/common/common.type';

interface IAuthZustand {
  isLoggedIn: boolean;
  userData: TUsersData | null;
}

const initialState: IAuthZustand = {
  isLoggedIn: false,
  userData: null,
};

export const authZustand = createStore<IAuthZustand>(initialState, {
  name: 'authZustand',
  persist: true, // ✅ like redux-persist
  mutative: true, // ✅ like immer (RTK)
}).extendActions((api) => ({
  setLoginData: (payload: TUsersData) => {
    api.set('userData', payload);
    api.set('isLoggedIn', !!payload);
  },

  checkLoggedInServer: (payload: { hasToken: boolean; user: TUsersData | null }) => {
    api.set('isLoggedIn', payload?.hasToken);
    api.set('userData', payload?.user);
  },

  logout: () => {
    api.set('isLoggedIn', false);
    api.set('userData', null);
  },

  updateUserProperties: (payload: Partial<TUsersData>) => {
    const current = api.get('userData');
    if (current) {
      api.set('userData', {
        ...current,
        ...payload,
      });
    }
  },
}));
