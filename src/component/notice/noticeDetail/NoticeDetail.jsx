import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./NoticeDetail.module.css";
import parse from "html-react-parser";
import Button from "../../ui/button/Button";
import {
  deleteNotice,
  deleteNoticeImg,
} from "../../../api/notice/deleteNotice";

export default function NoticeDetail({ isAdmin }) {
  const navigate = useNavigate();
  const {
    state: {
      Item: { id, content, date, title, writer },
    },
  } = useLocation();

  const { state } = useLocation();

  const deleteHandler = () => {
    if (window.confirm("정말삭제하시겠습니까?")) {
      deleteNotice(id)
        .then(() => deleteNoticeImg(id))
        .then(() => navigate(-1))
        .finally(() => window.alert("삭제를 완료했습니다."));
    }
  };
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.theadTr}>
            <th className={styles.thTitle}>제 목</th>
            <th className={styles.thWriter}>작성자</th>
            <th className={styles.thDate}>작성일</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          <tr className={styles.tbodyTr}>
            <td className={styles.tdTitle}>{title}</td>
            <td className={styles.tdWriter}>{writer}</td>
            <td className={styles.tdDate}>{date}</td>
          </tr>
          <tr className={styles.desc}>
            <td colSpan={4} className={styles.description}>
              {parse(content)}
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div className={styles.btnContainer}>
        {isAdmin && (
          <>
            <div className={styles.btn}>
              <Button
                text={"수정하기"}
                type={"button"}
                onClick={() => navigate("/admin/editNotice", { state: state })}
              />
            </div>
            <div className={styles.btn}>
              <Button text="삭제하기" type={"button"} onClick={deleteHandler} />
            </div>
          </>
        )}
        <div className={styles.btn}>
          <Button
            text={"뒤로가기"}
            main={true}
            type={"button"}
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
    </div>
  );
}
