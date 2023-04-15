import React from "react";
import NoticeList from "../../../component/notice/NoticeList";
import styles from "./Notice.module.css";
import Button from "../../../component/ui/button/Button";
import { useNavigate } from "react-router-dom";

export default function Notice({ isAdmin }) {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      {isAdmin ? (
        <div className={styles.adminTitle}>공지사항</div>
      ) : (
        <div className={styles.mainTitle}>공지사항</div>
      )}
      <NoticeList isAdmin={isAdmin} />
      {isAdmin && (
        <div className={styles.btnContainer}>
          <div className={styles.btn}>
            <Button
              text={"작성하기"}
              onClick={() => navigate("/admin/newNotice")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
