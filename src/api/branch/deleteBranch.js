export const deleteBranch = async (ID) => {
  const formData = new FormData();
  formData.append("ID", ID);
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/branch/deleteBranch.php`, {
    method: "POST",
    body: formData,
  }).then((res) => res);
};

export const deleteBranchImg = async (ID) => {
  const formData = new FormData();
  formData.append("fileId", ID);
  formData.append("folderName", "images");
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/branch/removeBranchImg.php`, {
    method: "POST",
    body: formData,
  }).then((res) => res);
};
export const deleteBranchThumb = async (ID) => {
  const formData = new FormData();
  formData.append("fileId", ID);
  formData.append("folderName", "thumb");
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/branch/removeBranchImg.php`, {
    method: "POST",
    body: formData,
  }).then((res) => res);
};
