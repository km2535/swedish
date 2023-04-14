export const branch = async (board) => {
  const { ID, WRITER, TITLE, ADDRESS, MAPIMAGE_URL, THUMB_URL } = board;

  const formData = new FormData();
  formData.append("ID", ID);
  formData.append("WRITER", WRITER);
  formData.append("TITLE", TITLE);
  formData.append("ADDRESS", ADDRESS);
  formData.append("MAPIMAGE_URL", MAPIMAGE_URL);
  formData.append("THUMB_URL", THUMB_URL);
  await fetch(`${process.env.REACT_APP_API_FETCH_URL}/branch/branch.php`, {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
