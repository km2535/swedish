import React from "react";
import { updateManagerIsWork } from "../../api/manager/updateManager";
import styles from "./CheckIsWork.module.css";

export default function CheckIsWork({ manager }) {
  const updateHandler = (e) => {
    let state = e.target.value === "true" ? "출근" : "휴무/퇴근";
    updateManagerIsWork(manager, e.target.value);
    window.alert(`${manager.title}님을 ${state}으로 변경합니다.`);
    // console.log(e);
  };
  return (
    <>
      {manager.isWork === "true" && (
        <div className={styles.container}>
          <label className={styles.title}>
            <input
              type="radio"
              name={manager.id}
              value={"true"}
              onChange={updateHandler}
              defaultChecked
            />
            출근
          </label>
          <label className={styles.title}>
            <input
              type="radio"
              name={manager.id}
              value={"false"}
              onChange={updateHandler}
            />
            휴무/퇴근
          </label>
        </div>
      )}
      {manager.isWork === "false" && (
        <div className={styles.container}>
          <label className={styles.title}>
            <input
              type="radio"
              name={manager.id}
              value={"true"}
              onChange={updateHandler}
            />
            출근
          </label>
          <label className={styles.title}>
            <input
              type="radio"
              name={manager.id}
              value={"false"}
              defaultChecked
              onChange={updateHandler}
            />
            휴무/퇴근
          </label>
        </div>
      )}
    </>
  );
}
