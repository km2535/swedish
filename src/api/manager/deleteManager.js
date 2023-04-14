export const deleteManager = async (id) => {
  const formData = new FormData();
  formData.append("id", id);
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/manager/deleteManager.php`, {
    method: "POST",
    body: formData,
  }).then((res) => res);
};

export const deleteManagerImg = async (id) => {
  const formData = new FormData();
  formData.append("fileId", id);
  formData.append("folderName", "images");
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/manager/deleteManagerImg.php`, {
    method: "POST",
    body: formData,
  }).then((res) => res);
};
export const deleteManagerThumb = async (id) => {
  const formData = new FormData();
  formData.append("fileId", id);
  formData.append("folderName", "thumb");
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/manager/deleteManagerImg.php`, {
    method: "POST",
    body: formData,
  }).then((res) => res);
};
