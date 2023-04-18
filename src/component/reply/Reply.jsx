import React, { useEffect } from "react";
import styles from "./Reply.module.css";
import { useState } from "react";
import { useRef } from "react";
import { v4 as uuid } from "uuid";
import { useAuthContext } from "../../context/AuthContextProvider";
import { uploadReply } from "../../api/reply/uploadReply";
export default function Reply({
  boardId,
  setReplyList,
  setTotalCnt,
  setMoreBtn,
}) {
  const [content, setContent] = useState({});
  const textarea = useRef();
  const btns = useRef();
  const { user } = useAuthContext();

  useEffect(() => {
    setContent({
      boardId: boardId,
      id: uuid(),
      writer: user.nickname,
      isAdmin: user.isAdmin,
    });
  }, [boardId, user.isAdmin, user.nickname]);

  const cancleHandler = () => {
    const text = window.document.getElementById("content");
    text.value = "";
    textarea.current.style.height = "auto";
  };
  const changeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.id;
    textarea.current.style.height = "auto";
    // btns.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
    btns.current.style.height = textarea.current.scrollHeight + "px";
    setContent((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const text = window.document.getElementById("content");
    content && uploadReply(content, setReplyList, setTotalCnt, setMoreBtn);
    textarea.current.style.height = "auto";
    btns.current.style.height = "27px";
    text.value = "";
    setContent((prev) => ({ ...prev, id: uuid(), content: "" }));
  };
  // console.log(content.content);
  return (
    <form className={styles.wrapper} onSubmit={submitHandler}>
      <div className={styles.container}>
        <div className={styles.inputs}>
          <textarea
            rows={1}
            ref={textarea}
            className={styles.contentInput}
            type="text"
            id="content"
            onChange={changeHandler}
            required
          />
          <label className={styles.label}>댓글추가</label>
          <span className={styles.spanRight}></span>
          <span className={styles.spanleft}></span>
        </div>
      </div>
      <div className={styles.btnWrapper} ref={btns}>
        <div className={styles.cancle}>
          <button
            className={styles.cancleBtn}
            type="button"
            onClick={cancleHandler}
          >
            취소
          </button>
        </div>
        <div className={styles.reply}>
          <button
            className={
              content?.content ? styles.replyBtnActivy : styles.replyBtnNone
            }
          >
            댓글
          </button>
        </div>
      </div>
    </form>
  );
}
