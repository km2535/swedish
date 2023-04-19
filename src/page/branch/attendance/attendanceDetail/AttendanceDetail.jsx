import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AttendanceDetail.module.css";
import parse from "html-react-parser";
import Button from "../../../../component/ui/button/Button";

export default function AttendanceDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.banner}>
        <div className={styles.bannerTxt}>프로필</div>
      </div>
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
              <div className={state.nf === "true" ? styles.nf : styles.nonenf}>
                NF
              </div>
            </div>
            <div className={styles.describe}>
              <div className={styles.subInfo}>{state.describe}</div>
            </div>
            <div className={styles.inputInfo}>
              <div className={styles.worktime}>{state.worktime}</div>
            </div>
            <div className={styles.commentWrap}>
              <div className={styles.comment}>{state.comment}</div>
            </div>
          </div>
        </div>
        <div className={styles.desc}>상세프로필</div>
        <div className={styles.line}></div>
        <div className={styles.contentDetail}>{parse(state.content)}</div>
        <div className={styles.line}></div>
        <div className={styles.btnContent}>
          <div className={styles.btn}>
            <Button
              text={"뒤로가기"}
              main={"sub"}
              type={"button"}
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
