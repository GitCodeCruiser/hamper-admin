import { rootZustand } from './root.zustand';

export const useAppSelector = () => {
  return {
    auth: rootZustand.auth.useStore(),
  };
};

export const useAppDispatch = () => {
  return {
    auth: rootZustand.auth.actions,
  };
};
