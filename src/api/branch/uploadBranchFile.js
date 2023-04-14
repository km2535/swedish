export const uploadBranchImg = async (imgFiles, board) => {
  const { ID } = board;
  const formData = new FormData();
  formData.append("fileId", ID);
  formData.append("path", "images");
  formData.append("filename", imgFiles.name);
  formData.append("userfile", imgFiles);
  await fetch(
    `${process.env.REACT_APP_API_FETCH_URL}/branch/addBranchFile.php`,
    {
      method: "POST",
      body: formData,
    }
  ).then((res) => res.text());
};
export const uploadBranchThumb = async (file, board) => {
  const { ID } = board;
  const formData = new FormData();
  formData.append("fileId", ID);
  formData.append("path", "thumb");
  formData.append("filename", file.name);
  formData.append("userfile", file);
  await fetch(
    `${process.env.REACT_APP_API_FETCH_URL}/branch/addBranchFile.php`,
    {
      method: "POST",
      body: formData,
    }
  ).then((res) => res.text());
};
