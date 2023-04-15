export const deleteReview = async (id) => {
  const formData = new FormData();
  formData.append("id", id);
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/review/deleteReview.php`, {
    method: "POST",
    body: formData,
  }).then((res) => res);
};

export const deleteReviewImg = async (id) => {
  const formData = new FormData();
  formData.append("fileId", id);
  formData.append("folderName", "images");
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/review/deleteReviewImg.php`, {
    method: "POST",
    body: formData,
  }).then((res) => res);
};
