import React from "react";
import styles from "./BranchAdmin.module.css";
import Button from "../../component/ui/button/Button";
import { useNavigate } from "react-router-dom";

export default function BranchAdmin() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.title}>지점을 추가(선택) 해주세요.</div>
      <div className={styles.btn}>
        <Button
          text={"추가하기"}
          onClick={() => navigate("/admin/editBranch")}
        />
      </div>
    </div>
  );
}
