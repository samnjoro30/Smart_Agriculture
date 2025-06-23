import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.BACKEND_URL,
});

export default axiosInstance;