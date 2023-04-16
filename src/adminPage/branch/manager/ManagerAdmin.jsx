import React, { useEffect, useState } from "react";
import styles from "./ManagerAdmin.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../component/ui/button/Button";
import { readManager } from "../../../api/manager/readManager";
import ManagerCard from "../../../component/manager/ManagerCard";
import LoadingSpinner from "../../../component/loadingSpinner/LoadingSpinner";

export default function ManagerAdmin() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [managerList, setManagerList] = useState([]);
  useEffect(() => {
    readManager(state?.ID, setManagerList, setIsLoading);
  }, [state?.ID]);
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.mainTitle}>지점관리</div>
      </div>
      <div className={styles.optionContainer}>
        <div className={styles.default}>
          <Button
            text={"기본정보"}
            main={"false"}
            onClick={() => navigate(`/admin/branchDetail`, { state: state })}
            type={"button"}
          />
        </div>
        <div className={styles.manager}>
          <Button main={"false"} text={"출근부 / 매니저 관리"} />
        </div>
      </div>

      <div className={styles.content}>
        {isLoading && <LoadingSpinner />}
        {managerList.length === 0 && isLoading === false && (
          <div className={styles.noManager}>매니저가 없습니다.</div>
        )}
        {managerList.map((manager) => (
          <div key={manager.id} className={styles.cardContent}>
            <div className={styles.card}>
              <ManagerCard
                isAdmin={true}
                manager={manager}
                branchId={state.ID}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.btnContainer}>
        {/* <div className={styles.saveBtn}>
          <Button text={"저장하기"} />
        </div> */}
        <div className={styles.addBtn}>
          <Button
            text={"매니저 추가하기"}
            onClick={() =>
              navigate(`/admin/branchDetail/${state.ID}/addmanager`, {
                state: state,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
