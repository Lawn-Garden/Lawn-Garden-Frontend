import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 기존의 코드에서 인터페이스만 추가해서 들고온건데 원하면 싹 갈아엎어두 됩니다

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (token: string) => set({ accessToken: token }),
      clearAccessToken: () => set({ accessToken: null }),
    }),
    {
      name: 'auth-storage', // localStorage key
      storage: createJSONStorage(() => localStorage), // 기본은 localStorage
    }
  )
);
