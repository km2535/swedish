export const uploadManagerThumb = async (file, board) => {
  const { id } = board;
  const formData = new FormData();
  formData.append("fileId", id);
  formData.append("path", "thumb");
  formData.append("filename", file.name);
  formData.append("userfile", file);
  await fetch(
    `${process.env.REACT_APP_API_FETCH_URL}/manager/addManagerImg.php`,
    {
      method: "POST",
      body: formData,
    }
  ).then((res) => res);
};
