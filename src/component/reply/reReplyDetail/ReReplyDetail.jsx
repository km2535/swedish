import React from "react";
import styles from "./ReReplyDetail.module.css";
import moment from "moment";
import { useAuthContext } from "../../../context/AuthContextProvider";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { deleteReReply } from "../../../api/reply/deleteReply";
import { updateReReply } from "../../../api/reply/updateReply";

export default function ReReplyDetail({ rereply, replyId, setReReplyList }) {
  const { writer, date, subcontent, id, isAdmin } = rereply;
  const { user } = useAuthContext();
  const [height, setHeight] = useState(0);
  const textarea = useRef();
  const cont = useRef();
  const [edit, setEdit] = useState(false);
  const [newContent, setNewContent] = useState(subcontent);

  useEffect(() => {
    edit || setHeight(cont.current.clientHeight + "px");
    if (edit) textarea.current.style.height = height;
  }, [edit, height]);

  const editReplyHandler = () => {
    setEdit((prev) => !prev);
    if (edit) {
      updateReReply(id, replyId, newContent, setReReplyList);
    }
  };

  const deleteReplyHandler = () => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      deleteReReply(id, replyId, setReReplyList);
    }
  };
  const changeHandler = (e) => {
    const value = e.target.value;
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
    setNewContent(value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.userWrapper}>
        <div className={styles.user}>
          <div className={styles.writer}>
            <span className={styles.admin}>
              {isAdmin === "true" && "[업소]"}
            </span>
            {writer}
          </div>
          <div className={styles.date}>{moment(date).fromNow()}</div>
        </div>
        <div className={styles.btns}>
          {!(user.userid === writer || user.isAdmin === "true") || edit || (
            <button className={styles.editBtn} onClick={editReplyHandler}>
              수정
            </button>
          )}
          {edit && (
            <button className={styles.editBtn} onClick={editReplyHandler}>
              확인
            </button>
          )}
          {(user.userid === writer || user.isAdmin === "true") && (
            <button className={styles.remove} onClick={deleteReplyHandler}>
              삭제
            </button>
          )}
        </div>
      </div>
      {edit || (
        <div className={styles.content} ref={cont}>
          {subcontent}
        </div>
      )}
      {edit && (
        <div className={styles.editcontainer}>
          <div className={styles.inputs}>
            <textarea
              rows={1}
              ref={textarea}
              className={styles.contentInput}
              type="text"
              id="content"
              defaultValue={subcontent}
              onChange={changeHandler}
              required
            />
            <label className={styles.label}>댓글수정</label>
            <span className={styles.spanRight}></span>
            <span className={styles.spanleft}></span>
          </div>
        </div>
      )}
    </div>
  );
}
