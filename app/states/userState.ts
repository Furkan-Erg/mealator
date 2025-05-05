import { UserModel } from "@/models/UserModel";

interface UserState {
  userToken: string;
  user: UserModel | null;
  setUser: (user: UserModel) => void;
  logout: () => void;
  setUserToken: (userToken: string) => void;
  clearToken: () => void;
}

export default UserState;
