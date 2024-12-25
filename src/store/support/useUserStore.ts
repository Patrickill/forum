import { UserType } from '@/types/support/user';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type State = {
  userInfo: UserType | null;
  setUserInfo: (userInfo: UserType) => void;
};

export const useUserStore = create<State>()(
  devtools(
    persist(
      immer((set, get) => ({
        userInfo: null,
        setUserInfo: (userInfo: UserType) =>
          set((state) => {
            state.userInfo = userInfo;
          }),
      })),
      {
        name: 'user-info',
      }
    )
  )
);
