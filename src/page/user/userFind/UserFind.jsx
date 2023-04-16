import React from "react";
import styles from "./UserFind.module.css";
import FindForm from "../../../component/findForm/FindForm";
import PwFind from "../../../component/pwFind/PwFind";

export default function UserFind({ isPw }) {
  return (
    <div
      className={styles.imgContainer}
      style={{
        backgroundImage: `url(${process.env.REACT_APP_API_DATA_URL}/skin/images/bg.jpg)`,
      }}
    >
      {isPw ? <PwFind /> : <FindForm />}
    </div>
  );
}
