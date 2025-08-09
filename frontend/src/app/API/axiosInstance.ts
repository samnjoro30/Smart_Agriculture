import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/", //process.env.BACKEND_URL,
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
        if(error.response && error.response.status===401){
            try{
               await axiosInstance.post("/auth/refresh", {}, {withCredentials: true});

               return axiosInstance(error.config);
            }
            catch(refreshError){
               window.location.href="/auth/login"
            }
        }
        return Promise.reject(error);
    }
);


axiosInstance.defaults.withCredentials=true

export default axiosInstance;