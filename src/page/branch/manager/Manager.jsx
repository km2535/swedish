import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { readManager } from "../../../api/manager/readManager";
import LoadingSpinner from "../../../component/loadingSpinner/LoadingSpinner";
import styles from "./Manager.module.css";
import ManagerCard from "./managerCard/ManagerCard";
import { v4 as uuid } from "uuid";

export default function Manager() {
  const [isLoading, setIsLoading] = useState(false);
  const [managerList, setManagerList] = useState([]);

  const { state } = useLocation();

  useEffect(() => {
    readManager(state, setManagerList, setIsLoading);
  }, [state]);
  return (
    <div>
      <div className={styles.descLint}>
        <div className={styles.descTitle}>매니저프로필</div>
      </div>
      <div className={styles.content}>
        {isLoading && <LoadingSpinner />}
        {isLoading || managerList.length > 0 || "매니저가 없습니다."}
        {managerList.map((manager) => (
          <div key={uuid()} className={styles.cardContent}>
            <div className={styles.card}>
              <ManagerCard manager={manager} branchId={state} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
