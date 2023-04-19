export const updateManager = async (board) => {
  const {
    id,
    boardId,
    content,
    nf,
    title,
    thumb_img,
    describe,
    worktime,
    comment,
  } = board;
  const formData = new FormData();
  formData.append("id", id);
  formData.append("boardId", boardId);
  formData.append("content", content);
  formData.append("nf", nf);
  formData.append("title", title);
  formData.append("thumb_img", thumb_img);
  formData.append("describe", describe);
  formData.append("worktime", worktime);
  formData.append("comment", comment);
  await fetch(
    `${process.env.REACT_APP_API_FETCH_URL}/manager/updateManager.php`,
    {
      method: "POST",
      body: formData,
    }
  ).then((res) => res);
};
export const updateManagerIsWork = async (board, isWork) => {
  const { id, boardId } = board;
  const formData = new FormData();
  formData.append("id", id);
  formData.append("boardId", boardId);
  formData.append("isWork", isWork);

  await fetch(
    `${process.env.REACT_APP_API_FETCH_URL}/manager/updateManagerIsWork.php`,
    {
      method: "POST",
      body: formData,
    }
  ).then((res) => res);
};
