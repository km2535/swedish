export const uploadManager = async (board) => {
  const { id, boardId, content, nf, title, thumb_img, describe, worktime } =
    board;
  const formData = new FormData();
  formData.append("id", id);
  formData.append("boardId", boardId);
  formData.append("content", content);
  formData.append("nf", nf);
  formData.append("title", title);
  formData.append("thumb_img", thumb_img);
  formData.append("describe", describe);
  formData.append("worktime", worktime);
  await fetch(
    `${process.env.REACT_APP_API_FETCH_URL}/manager/uploadManager.php`,
    {
      method: "POST",
      body: formData,
    }
  ).then((res) => res);
};
