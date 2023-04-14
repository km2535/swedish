import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./AttendanceDetail.module.css";
import parse from "html-react-parser";

export default function AttendanceDetail() {
  const { state } = useLocation();
  return (
    <>
      <div className={styles.line}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.downloadFile}>
            <div className={styles.uploadContainer}>
              <div className={styles.imgList}>
                <div className={styles.imgContent}>
                  <img
                    src={`${process.env.REACT_APP_API_DATA_URL}/manager/thumb/${state.id}/${state.thumb_img}`}
                    alt=""
                    className={styles.img}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.mainInfo}>
            <div className={styles.inputInfo}>
              <div className={styles.title}>{state.title}</div>
              <div className={styles.line}></div>
            </div>
            <div>
              <div className={styles.nf}>{state.nf === "true" ? "NF" : ""}</div>
            </div>
            <div className={styles.describe}>
              <div className={styles.subInfo}>{state.describe}</div>
            </div>
            <div className={styles.inputInfo}>
              <div className={styles.worktime}>{state.worktime}</div>
            </div>
          </div>
        </div>
        <div className={styles.worktime}>상세프로필</div>
        <div className={styles.line}></div>

        <div className={styles.content}>{parse(state.content)}</div>
      </div>
    </>
  );
}
