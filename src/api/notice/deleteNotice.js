export const deleteNotice = async (id) => {
  const formData = new FormData();
  formData.append("id", id);
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/notice/removeNoticeItem.php`, {
    method: "POST",
    body: formData,
  }).then((res) => res);
};

export const deleteNoticeImg = async (id) => {
  const formData = new FormData();
  formData.append("fileId", id);
  formData.append("folderName", "images");
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/notice/removeNoticeImg.php`, {
    method: "POST",
    body: formData,
  }).then((res) => res);
};
