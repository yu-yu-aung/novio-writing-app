import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: true,
  user: {
    userId: null,
    userName: "",
    penName: "",
    userEmail: "",
  },
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
}));

export default useAuthStore;
