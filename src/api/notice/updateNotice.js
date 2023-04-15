export const updateNotice = async (board) => {
  const { id, writer, content, title } = board;
  const formData = new FormData();
  formData.append("id", id);
  formData.append("content", content);
  formData.append("title", title);
  formData.append("writer", writer);
  await fetch(
    `${process.env.REACT_APP_API_FETCH_URL}/notice/updateNotice.php`,
    {
      method: "POST",
      body: formData,
    }
  ).then((res) => res);
};
