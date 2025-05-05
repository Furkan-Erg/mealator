interface UserState {
  userToken: string;
  setUserToken: (userToken: string) => void;
  clearToken: () => void;
}

export default UserState;
