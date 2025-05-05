import { create } from "zustand";
import UserState from "../states/userState";

const useUserStore = create<UserState>((set) => ({
  userToken: "",
  setUserToken: (userToken: string) => set({ userToken }),
  clearToken: () => set({ userToken: "" }),
}));

export default useUserStore;
