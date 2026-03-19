import axiosInstance from "../API/axiosInstance";

let isLoggedOut = false;
export const logoutController = new AbortController();

export const logout = () => {
  if (isLoggedOut) return; // prevent multiple calls

  isLoggedOut = true;

  axiosInstance.defaults.signal = logoutController.signal;
  logoutController.abort();

  // Clear cookies
  document.cookie = "access_token=; Max-Age=0; path=/";
  document.cookie = "refresh_token=; Max-Age=0; path=/";

  // Redirect to login
  window.location.replace("/auth/login");
};

export const getIsLoggedOut = () => isLoggedOut;