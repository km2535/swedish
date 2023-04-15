export const updateReview = async (board) => {
  const { id, writer, content, title, branchId } = board;
  const formData = new FormData();
  formData.append("id", id);
  formData.append("branchId", branchId);
  formData.append("content", content);
  formData.append("title", title);
  formData.append("writer", writer);
  await fetch(
    `${process.env.REACT_APP_API_FETCH_URL}/review/updateReview.php`,
    {
      method: "POST",
      body: formData,
    }
  ).then((res) => res);
};
