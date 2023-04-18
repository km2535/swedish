import { readReReply, readReply } from "./readReply";

export const deleteReply = async (id, boardId, setReplyList) => {
  const formData = new FormData();
  formData.append("id", id);
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/reply/deleteReply.php`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res)
    .then(() => readReply(boardId, 0, 10, setReplyList));
};
export const deleteReReply = async (id, replyId, setReReplyList) => {
  const formData = new FormData();
  formData.append("id", id);
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/reply/deleteReReply.php`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res)
    .then(() => readReReply(replyId, setReReplyList));
};
