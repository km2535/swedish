export const uploadNotice = async (board) => {
  const { id, content, title, writer } = board;

  const formData = new FormData();
  formData.append("id", id);
  formData.append("content", content);
  formData.append("title", title);
  formData.append("writer", writer);
  await fetch(
    `${process.env.REACT_APP_API_FETCH_URL}/notice/uploadNotice.php`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
