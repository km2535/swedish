import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EditBranch from "../editBranch/EditBranch";
import styles from "./BranchDetail.module.css";

export default function BranchDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.mainTitle}>지점관리</div>
      </div>
      <div className={styles.optionContainer}>
        <div className={styles.default}>기본정보</div>
        <div
          className={styles.manager}
          onClick={() =>
            navigate(`/admin/branchDetail/${state.ID}`, { state: state })
          }
        >
          출근부 관리
        </div>
      </div>
      <div>
        <EditBranch branchState={state} />
      </div>
    </div>
  );
}
