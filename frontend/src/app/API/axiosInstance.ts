import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: "http://localhost:8000", // "https://smart-agriculture-21dt.onrender.com", // "http://localhost:8000", // , //process.env.BACKEND_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        //config.withCredentials = true;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }

);
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // Don't retry refresh endpoint itself
      if (originalRequest?.url.includes("/auth/refresh")) {
        console.log("Refresh failed → logging out");
        return Promise.reject(error);
      }
  
      // Retry 401 only once
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await axiosInstance.post("/auth/refresh", {}, { withCredentials: true });
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token expired or invalid. Redirecting to login...");
          window.location.href = "/auth/login";
          return Promise.reject(refreshError);

        }
      }
      return Promise.reject(error);
    }
  );

axiosInstance.defaults.withCredentials=true
console.log(axiosInstance.defaults.baseURL);

export default axiosInstance;
//firebase init hosting

