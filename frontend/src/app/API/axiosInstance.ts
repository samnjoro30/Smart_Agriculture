import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/", //process.env.BACKEND_URL,
});

export default axiosInstance;