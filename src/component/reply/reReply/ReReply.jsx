import React from "react";
import styles from "./ReReply.module.css";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useRef } from "react";
import { uploadReReply } from "../../../api/reply/uploadReply";
import { useAuthContext } from "../../../context/AuthContextProvider";

export default function ReReply({ setReReply, replyId, setReReplyList }) {
  const { user } = useAuthContext();
  const [content, setContent] = useState({
    replyId: replyId,
    writer: user.nickname,
    isAdmin: user.isAdmin,
    id: uuid(),
  });
  const textarea = useRef();
  const btns = useRef();

  const changeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.id;
    textarea.current.style.height = "auto";
    // btns.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
    btns.current.style.height = textarea.current.scrollHeight + "px";
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  const cancleHandler = () => {
    const text = window.document.getElementById("subcontent");
    text.value = "";
    textarea.current.style.height = "auto";
    setReReply(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const text = window.document.getElementById("subcontent");
    content && uploadReReply(content, setReReplyList);
    textarea.current.style.height = "auto";
    btns.current.style.height = "27px";
    text.value = "";
    setReReply(false);
    setContent((prev) => ({ ...prev, id: uuid(), subcontent: "" }));
  };

  return (
    <form className={styles.wrapper} onSubmit={submitHandler}>
      <div className={styles.container}>
        <div className={styles.inputs}>
          <textarea
            rows={1}
            ref={textarea}
            className={styles.contentInput}
            type="text"
            id="subcontent"
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
              content?.subcontent ? styles.replyBtnActivy : styles.replyBtnNone
            }
          >
            댓글
          </button>
        </div>
      </div>
    </form>
  );
}
