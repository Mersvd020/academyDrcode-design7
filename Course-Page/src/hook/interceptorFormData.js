import axios from "axios";
import { store } from "../store/index"; 
import { logout } from "../store/authSlice"; 
import toast from "react-hot-toast"


const api_Base_URL = "https://sepehracademy.liara.run";

const apiClient = axios.create({
  baseURL: api_Base_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

apiClient.interceptors.request.use(
  config => {
    
    const state = store.getState();
    const token = state.auth.token;

   
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
)


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      toast.error("انقضا لاگین شما به پایان رسید.")
    }
    return Promise.reject(error);
  }
);

export default apiClient;