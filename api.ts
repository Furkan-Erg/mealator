import axios from "axios";
import API_URLS from "./constants/apiUrls";
import useUserStore from "./app/stores/userStore";

const api = axios.create({
  baseURL: API_URLS.BASE_URL,
});

api.interceptors.request.use((config) => {
  const userToken = useUserStore.getState().userToken;

  const isAuthRequired = !["/auth/login", "/auth/register"].some((url) =>
    config.url?.includes(url)
  );
  if (userToken && isAuthRequired) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  return config;
});

export default api;
