import React from "react";
import styles from "./Approveuser.module.css";
import Button from "../../../component/ui/button/Button";
import { useNavigate } from "react-router-dom";

export default function Approveuser() {
  const navigate = useNavigate();
  //승인 유저 로직
  return (
    <div>
      <div>
        <div className={styles.mainTitle}>신규가입</div>
      </div>
      <div className={styles.optionContainer}>
        <div className={styles.default}>
          <Button main={"false"} text={"승인유저"} type={"button"} />
        </div>
        <div className={styles.manager}>
          <Button
            main={"false"}
            text={"미승인 유저"}
            onClick={() => navigate(`/admin/noneApprove`)}
          />
        </div>
      </div>
    </div>
  );
}
