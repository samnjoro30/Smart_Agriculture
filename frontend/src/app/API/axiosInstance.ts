import axios from 'axios';

import { getIsLoggedOut, logout } from '../lib/flag';

const axiosInstance = axios.create({
    baseURL: "https://smart-agriculture-21dt.onrender.com/", //"http://localhost:8000/",// "https://smart-agriculture-21dt.onrender.com/", //"http://localhost:8000/", //process.env.BACKEND_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (getIsLoggedOut()) {
            return Promise.reject({ message: "User logged out" });
        }
        config.withCredentials = true;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }

);
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) =>{
        const originalRequest = error.config;

        if (getIsLoggedOut()) {
            return Promise.reject(error);
          } 

        if(originalRequest.url.includes('/auth/refresh')){
            logout();
            return Promise.reject(error);
        }
        // if(error.response && error.response.status===401){
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try{
               await axiosInstance.post("/auth/refresh", {}, {withCredentials: true});
               return axiosInstance(originalRequest);
            }
            catch(refreshError){
               logout();
               return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

axiosInstance.defaults.withCredentials=true

export default axiosInstance;
//firebase init hosting

