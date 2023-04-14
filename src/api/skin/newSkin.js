export const newSkin = async (file) => {
  // const { id } = board;
  const formData = new FormData();
  // formData.append("fileId", id);
  formData.append("path", "images");
  formData.append("filename", file.name);
  formData.append("userfile", file);
  await fetch(
    `${process.env.REACT_APP_API_FETCH_URL}/designSkin/newSkinImg.php`,
    {
      method: "POST",
      body: formData,
    }
  ).then((res) => res);
};
