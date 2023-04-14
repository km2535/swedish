export const logout = (setUser) => {
  window.sessionStorage.removeItem("accessToken");
  setUser(null);
};
