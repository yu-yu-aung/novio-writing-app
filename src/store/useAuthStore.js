import { create } from "zustand";
import { persist } from "zustand/middleware";
const useAuthStore = create()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: {
        userId: null,
        userName: "",
        penName: "",
        userEmail: "",
      },
      setUser: () => set({}),
      logOut: (set) =>
        set({
          isLoggedIn: false,
          user: {
            userId: null,
            userName: "",
            penName: "",
            userEmail: "",
          },
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
