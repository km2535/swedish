import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextProvider";

export default function AuthLogin() {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(window.sessionStorage.getItem("accessToken")));
  }, [navigate, setUser]);
  return <></>;
}
