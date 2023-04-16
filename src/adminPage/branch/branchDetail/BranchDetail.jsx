import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EditBranch from "../editBranch/EditBranch";
import styles from "./BranchDetail.module.css";
import Button from "../../../component/ui/button/Button";

export default function BranchDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.mainTitle}>지점관리</div>
      </div>
      <div className={styles.optionContainer}>
        <div className={styles.default}>
          <Button
            main={"false"}
            // fontsize={20}
            text={"기본정보"}
            type={"button"}
          />
        </div>
        <div className={styles.manager}>
          <Button
            main={"false"}
            text={"출근부 / 매니저 관리"}
            // fontsize={20}
            onClick={() =>
              navigate(`/admin/branchDetail/${state.ID}`, { state: state })
            }
          />
        </div>
        {/* <div className={styles.manager}>출근부 / 매니저 관리</div> */}
      </div>
      <div>
        <EditBranch branchState={state} />
      </div>
    </div>
  );
}
