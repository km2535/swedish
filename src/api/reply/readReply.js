export const readReply = async (boardId, startPage, endPage, setReplyList) => {
  const formData = new FormData();
  formData.append("startPage", startPage);
  formData.append("endPage", endPage);
  formData.append("boardId", boardId);
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/reply/readReplyList.php`, {
    method: "POST",
    body: formData,
  })
    .then((data) => data.json())
    .then((res) => {
      setReplyList(res);
    });
};
export const readReReply = async (replyId, setReplyList) => {
  const formData = new FormData();
  formData.append("replyId", replyId);
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/reply/readReReplyList.php`, {
    method: "POST",
    body: formData,
  })
    .then((data) => data.json())
    .then((res) => {
      setReplyList(res);
    });
};
