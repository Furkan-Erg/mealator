import { create } from "zustand";
import UserState from "../states/userState";
import { UserModel } from "@/models/UserModel";

const useUserStore = create<UserState>((set) => ({
  userToken: "",
  user: null,
  setUser: (user: UserModel) => set({ user }),
  logout: () => set({ user: null, userToken: "" }),
  setUserToken: (userToken: string) => set({ userToken }),
  clearToken: () => set({ userToken: "" }),
}));

export default useUserStore;
