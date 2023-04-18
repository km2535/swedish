import React, { useState } from "react";
import styles from "./ReplyDetail.module.css";
import "moment/locale/ko";
import moment from "moment/moment";
import { deleteReply } from "../../../api/reply/deleteReply";
import { useRef } from "react";
import { updateReply } from "../../../api/reply/updateReply";
import { useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContextProvider";
import ReReply from "../reReply/ReReply";
import ReReplyDetail from "../reReplyDetail/ReReplyDetail";
import { readReReply } from "../../../api/reply/readReply";
import { v4 as uuid } from "uuid";
import { MdSubdirectoryArrowRight } from "react-icons/md";
export default function ReplyDetail({
  reply,
  boardId,
  setReplyList,
  setTotalCnt,
}) {
  const { user } = useAuthContext();
  const { writer, DATE, content, id } = reply;
  const [newContent, setNewContent] = useState(content);
  const textarea = useRef();
  const cont = useRef();
  const [edit, setEdit] = useState(false);
  const [height, setHeight] = useState(0);
  const [reReply, setReReply] = useState(false);
  const [reReplyList, setReReplyList] = useState([]);
  useEffect(() => {
    readReReply(id, setReReplyList);
  }, [id]);
  useEffect(() => {
    edit || setHeight(cont.current.clientHeight + "px");
    if (edit) textarea.current.style.height = height;
  }, [edit, height]);

  const editReplyHandler = () => {
    setEdit((prev) => !prev);
    if (edit) {
      updateReply(id, boardId, newContent, setReplyList);
    }
  };

  const deleteReplyHandler = () => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      deleteReply(id, boardId, setReplyList);
    }
  };
  const reReplyHandler = () => {
    setReReply(true);
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
          <div className={styles.writer}>{writer}</div>
          <div className={styles.date}>{moment(DATE).fromNow()}</div>
        </div>
        <div className={styles.btns}>
          <button className={styles.editBtn} onClick={reReplyHandler}>
            답변
          </button>

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
          {content}
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
              defaultValue={content}
              onChange={changeHandler}
              required
            />
            <label className={styles.label}>댓글수정</label>
            <span className={styles.spanRight}></span>
            <span className={styles.spanleft}></span>
          </div>
        </div>
      )}
      <div className={styles.rereply}>
        {reReply && (
          <ReReply
            setReReply={setReReply}
            boardId={boardId}
            replyId={id}
            setReReplyList={setReReplyList}
          />
        )}
        {reReplyList.map((rereply) => (
          <div className={styles.rereplyContent}>
            <div className={styles.arrow}>
              <MdSubdirectoryArrowRight />
            </div>
            <ReReplyDetail
              replyId={id}
              rereply={rereply}
              setReReplyList={setReReplyList}
              key={uuid()}
            />
          </div>
        ))}
      </div>
      <div className={styles.line}></div>
    </div>
  );
}
