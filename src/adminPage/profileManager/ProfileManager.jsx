import React from "react";
import styles from "./ProfileManager.module.css";
import Button from "../../component/ui/button/Button";
import { useNavigate } from "react-router-dom";

export default function ProfileManager() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.mainTitle}>프로필매니저</div>
      </div>
      <div className={styles.btnContainer}>
        <div className={styles.btn}>
          <Button
            text={"작성하기"}
            type={"button"}
            onClick={() => navigate("/admin/newProfile")}
          />
        </div>
      </div>
    </div>
  );
}
