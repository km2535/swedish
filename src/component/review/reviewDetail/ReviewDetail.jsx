import React from "react";
import styles from "./ReviewDetail.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import Button from "../../ui/button/Button";
import { useAuthContext } from "../../../context/AuthContextProvider";
import {
  deleteReview,
  deleteReviewImg,
} from "../../../api/review/deleteReview";
import Reply from "../../reply/Reply";
import { useState } from "react";
import ReplyDetail from "../../reply/replyDetail/ReplyDetail";
import { useEffect } from "react";
import { readReply } from "../../../api/reply/readReply";
import { v4 as uuid } from "uuid";
import { readReplyCnt } from "../../../api/reply/readReplyCnt";

export default function ReviewDetail() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const {
    state: {
      Item: { id, content, date, title, writer },
    },
  } = useLocation();
  const { state } = useLocation();
  const [replyList, setReplyList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState();
  const [moreBtn, setMoreBtn] = useState(true);
  const deleteHandler = () => {
    if (window.confirm("정말삭제하시겠습니까?")) {
      deleteReview(id)
        .then(() => deleteReviewImg(id))
        .then(() => navigate(-1))
        .finally(() => window.alert("삭제를 완료했습니다."));
    }
  };
  useEffect(() => {
    readReplyCnt(id, setTotalCnt, setMoreBtn);
  }, [id]);

  useEffect(() => {
    readReply(id, 0, page * 10, setReplyList);
  }, [id, page]);

  useEffect(() => {
    if (Number(totalCnt) > 0 && page * 10 > totalCnt) {
      setMoreBtn(false);
    }
    if (Number(totalCnt) === 0) {
      setMoreBtn(false);
    }
  }, [page, totalCnt]);

  const moreReply = () => {
    setPage((prev) => (prev += 1));
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
            <td colSpan={3} className={styles.description}>
              {parse(content)}
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.btnContainer}>
        {(user.isAdmin === "true" || user.nickname === writer) && (
          <>
            <div className={styles.btn}>
              <Button
                text={"수정하기"}
                type={"button"}
                onClick={() => navigate("editReview", { state: state })}
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
      <Reply
        boardId={id}
        setReplyList={setReplyList}
        setTotalCnt={setTotalCnt}
        setMoreBtn={setMoreBtn}
      />
      <div id="reply">
        {replyList.map((reply) => (
          <ReplyDetail
            boardId={id}
            setReplyList={setReplyList}
            setTotalCnt={setTotalCnt}
            reply={reply}
            key={uuid()}
          />
        ))}
      </div>
      {moreBtn && (
        <div className={styles.moreBtnWrapper}>
          <button onClick={moreReply} className={styles.moreBtn} type="button">
            더보기
          </button>
        </div>
      )}
    </div>
  );
}
