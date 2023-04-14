import React from "react";
import styles from "./ManagerCard.module.css";
import { useNavigate } from "react-router-dom";
export default function ManagerCard({ manager, branchId, isAdmin }) {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.imgContent}>
        {isAdmin ? (
          <img
            className={styles.img}
            src={`${process.env.REACT_APP_API_DATA_URL}/manager/thumb/${manager.id}/${manager.thumb_img}`}
            alt="썸네일"
            onClick={() =>
              navigate(`/admin/branchDetail/${branchId}/editmanager`, {
                state: manager,
              })
            }
          />
        ) : (
          <img
            className={styles.img}
            src={`${process.env.REACT_APP_API_DATA_URL}/manager/thumb/${manager.id}/${manager.thumb_img}`}
            alt="썸네일"
            onClick={() =>
              navigate(`/swedish/branchDetail/${branchId}`, {
                state: manager,
              })
            }
          />
        )}
      </div>
      <div className={styles.title}>{manager.title}</div>
      <div className={styles.describe}>{manager.describe}</div>
      <div className={styles.worktime}>{manager.worktime}</div>
    </div>
  );
}
