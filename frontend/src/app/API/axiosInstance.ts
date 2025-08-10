import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://smart-agriculture-21dt.onrender.com/",//"http://localhost:8000/", //process.env.BACKEND_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
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

        if(originalRequest.url.includes('/auth/refresh')){
            window.location.href="/auth/login"
            return Promise.reject(error);
        }
        if(error.response && error.response.status===401){
            try{
               await axiosInstance.post("/auth/refresh", {}, {withCredentials: true});
               return axiosInstance(originalRequest);
            }
            catch(refreshError){
               window.location.href="/auth/login"
               return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

axiosInstance.defaults.withCredentials=true

export default axiosInstance;