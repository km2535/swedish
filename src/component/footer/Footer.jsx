import React from "react";
import styles from "./Footer.module.css";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.logo}>인천스웨디시</div>
      <div className={styles.topInfo}>
        <div
          className={styles.personal}
          onClick={() => navigate(process.env.REACT_APP_API_PERSONAL_URL)}
        >
          개인정보처리방침
        </div>
        <div
          className={styles.email}
          onClick={() => navigate(process.env.REACT_APP_API_EMAIL_URL)}
        >
          이메일무단수집금지
        </div>
        <div
          className={styles.use}
          onClick={() => navigate(process.env.REACT_APP_API_USE_URL)}
        >
          이용약관
        </div>
      </div>
      <div className={styles.mainInfo}>
        <div className={styles.Info}>
          <div className={styles.company}>인천스웨디시</div>

          <div className={styles.companyNum}>
            {process.env.REACT_APP_API_URL}&copy;2023
          </div>
        </div>
      </div>
    </div>
  );
}
