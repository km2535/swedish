import { readReReply, readReply } from "./readReply";

export const updateReply = async (id, boardId, content, setReplyList) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("boardId", boardId);
  formData.append("content", content);
  await fetch(`${process.env.REACT_APP_API_FETCH_URL}/reply/updateReply.php`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res)
    .then(() => {
      readReply(boardId, 0, 10, setReplyList);
    });
};
export const updateReReply = async (
  id,
  replyId,
  subcontent,
  setReReplyList
) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("replyId", replyId);
  formData.append("subcontent", subcontent);
  await fetch(
    `${process.env.REACT_APP_API_FETCH_URL}/reply/updateReReply.php`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((res) => res)
    .then(() => {
      readReReply(replyId, setReReplyList);
    });
};
