import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { readManager } from "../../../api/manager/readManager";
import ManagerCard from "../../../component/manager/ManagerCard";
import styles from "./Attendance.module.css";

export default function Attendance() {
  const [managerList, setManagerList] = useState([]);
  const state = useLocation();
  // console.log(state);
  useEffect(() => {
    const id = state.pathname.split("/").pop();
    readManager(id, setManagerList);
  }, [state]);
  // console.log(state);
  return (
    <div className={styles.content}>
      {managerList.map((manager) => (
        <div key={manager.id} className={styles.cardContent}>
          <div className={styles.card}>
            <ManagerCard manager={manager} branchId={state?.state} />
          </div>
        </div>
      ))}
    </div>
  );
}
