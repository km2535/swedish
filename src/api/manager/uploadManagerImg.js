export const uploadManagerImg = async (file, board, resolve) => {
  const { id } = board;
  const formData = new FormData();
  formData.append("fileId", id);
  formData.append("path", "images");
  formData.append("filename", file.name);
  formData.append("userfile", file);
  await fetch(
    `${process.env.REACT_APP_API_FETCH_URL}/manager/addManagerImg.php`,
    {
      method: "POST",
      body: formData,
    }
  ).then(() =>
    resolve({
      default: `${process.env.REACT_APP_API_DATA_URL}/manager/images/${board.id}/${file.name}`,
    })
  );
};
