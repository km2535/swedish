import React from "react";
import styles from "./Join.module.css";
import JoinForm from "../../component/joinForm/JoinForm";

export default function Join() {
  return (
    <div
      className={styles.imgContainer}
      style={{
        backgroundImage: `url(${process.env.REACT_APP_API_DATA_URL}/skin/images/bg.jpg)`,
      }}
    >
      <JoinForm />
    </div>
  );
}
