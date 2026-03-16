let isLoggedOut = false;

export const logout = () => {
  if (isLoggedOut) return; // prevent multiple calls

  isLoggedOut = true;

  // Clear cookies
  document.cookie = "access_token=; Max-Age=0; path=/";
  document.cookie = "refresh_token=; Max-Age=0; path=/";

  // Optional: clear localStorage/sessionStorage if used
  localStorage.clear();

  // Redirect to login
  window.location.replace("/auth/login");
};

export const getIsLoggedOut = () => isLoggedOut;