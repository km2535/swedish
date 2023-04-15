import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Location.module.css";

export default function Location() {
  const { state } = useLocation();
  return (
    <>
      <div className={styles.mainTitle}>오시는 길</div>
      <div className={styles.container}>
        <div className={styles.map}>
          <img
            className={styles.img}
            src={`${process.env.REACT_APP_API_DATA_URL}/branch/images/${state.boardId}/${state.boardlocation}`}
            alt=""
          />
        </div>
        <div className={styles.address}>
          <div className={styles.addr1}>오시는 길</div>
          <div className={styles.addr2}>{state.boardAddress}</div>
        </div>
      </div>
    </>
  );
}
