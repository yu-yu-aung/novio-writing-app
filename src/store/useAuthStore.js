import { create } from "zustand";
import { persist } from "zustand/middleware";
const useAuthStore = create()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      hasHydrated: false,

      setUser: (userData) =>
        set({
          isLoggedIn: true,
          user: userData,
        }),

      logOut: () =>
        set({
          isLoggedIn: false,
          user: null,
        }),

      setHasHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated();
      },
    }
  )
);

export default useAuthStore;
