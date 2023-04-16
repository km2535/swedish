import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { readManager } from "../../../api/manager/readManager";
import ManagerCard from "../../../component/manager/ManagerCard";
import styles from "./Attendance.module.css";
import moment from "moment/moment";
import LoadingSpinner from "../../../component/loadingSpinner/LoadingSpinner";

export default function Attendance() {
  const [managerList, setManagerList] = useState([]);
  const [today, setToday] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const state = useLocation();
  // console.log(state);
  useEffect(() => {
    const id = state.pathname.split("/").pop();
    setToday(moment().format("yyyy-MM-DD"));
    readManager(id, setManagerList, setIsLoading);
  }, [state]);
  // console.log(state);

  return (
    <>
      <div className={styles.dayContainer}>
        <div className={styles.day}>{today}</div>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>NF매니저</div>
        <div className={styles.list}>
          {isLoading && <LoadingSpinner />}
          {isLoading || managerList.length > 0 || (
            <div className={styles.noManager}>매니저가 없습니다.</div>
          )}
          {managerList
            .filter((manager) => manager?.nf === "true")
            .map((manager) => (
              <div key={manager.id} className={styles.cardContent}>
                <div className={styles.card}>
                  <ManagerCard manager={manager} branchId={state?.state} />
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>매니저프로필</div>
        <div className={styles.list}>
          {isLoading && <LoadingSpinner />}
          {isLoading || managerList.length > 0 || (
            <div className={styles.noManager}>매니저가 없습니다.</div>
          )}
          {managerList
            .filter((manager) => manager?.nf === "false")
            .map((manager) => (
              <div key={manager.id} className={styles.cardContent}>
                <div className={styles.card}>
                  <ManagerCard manager={manager} branchId={state?.state} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
