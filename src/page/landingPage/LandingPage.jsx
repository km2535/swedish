import React, { useEffect } from "react";
import Login from "../../component/login/Login";
import styles from "./LandingPage.module.css";
import { useAuthContext } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.approve === "true") {
      navigate("/swedish");
    }
  }, [navigate, user]);
  return (
    <div
      className={styles.imgContainer}
      style={{
        backgroundImage: `url(${process.env.REACT_APP_API_DATA_URL}/skin/images/bg.jpg)`,
      }}
    >
      <Login />
    </div>
  );
}
