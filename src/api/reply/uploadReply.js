import { readReReply, readReply } from "./readReply";
import { readReplyCnt } from "./readReplyCnt";

export const uploadReply = async (
  reply,
  setReplyList,
  setTotalCnt,
  setMoreBtn
) => {
  const { id, content, boardId, writer, isAdmin } = reply;
  const formData = new FormData();
  formData.append("id", id);
  formData.append("boardId", boardId);
  formData.append("content", content);
  formData.append("writer", writer);
  formData.append("isAdmin", isAdmin);

  await fetch(`${process.env.REACT_APP_API_FETCH_URL}/reply/uploadReply.php`, {
    method: "POST",
    body: formData,
  })
    .then(() => {
      readReply(boardId, 0, 10, setReplyList);
      readReplyCnt(boardId, setTotalCnt, setMoreBtn);
    })
    .catch((err) => {
      return err;
    });
};
export const uploadReReply = async (content, setReReplyList) => {
  const { id, subcontent, replyId, writer, isAdmin } = content;
  const formData = new FormData();
  formData.append("id", id);
  formData.append("replyId", replyId);
  formData.append("subcontent", subcontent);
  formData.append("writer", writer);
  formData.append("isAdmin", isAdmin);
  await fetch(
    `${process.env.REACT_APP_API_FETCH_URL}/reply/uploadReReply.php`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then(() => {
      readReReply(replyId, setReReplyList);
    })
    .catch((err) => {
      return err;
    });
};
