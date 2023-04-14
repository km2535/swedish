import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    user && window.sessionStorage.setItem("accessToken", JSON.stringify(user));
  }, [user]);

  // useEffect(() => {
  //   user === null &&
  //     setUser(JSON.parse(window.sessionStorage.getItem("accessToken")));
  // }, [user]);

  // useEffect(() => {
  //   googleAccess && googleLogin(googleAccess, setUser);
  //   kakaoAccess && kakaoLog(kakaoAccess, setUser);
  //   naverAccess && naverLog(naverAccess, setUser);
  // }, [googleAccess, kakaoAccess, naverAccess]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuthContext() {
  return useContext(AuthContext);
}
