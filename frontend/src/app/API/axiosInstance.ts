import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/", //process.env.BACKEND_URL,
});

axiosInstance.defaults.withCredentials=true

export default axiosInstance;