import { create } from "zustand";
import { persist } from "zustand/middleware";
const useAuthStore = create()(
  persist(
    (set) => ({
      isLoggedIn: false,

      user: null,

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
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
