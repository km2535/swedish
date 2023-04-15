export const readReview = async (branchId, startPage, endPage, setBoards) => {
  const formData = new FormData();
  formData.append("startPage", startPage);
  formData.append("endPage", endPage);
  formData.append("endPage", endPage);
  formData.append("branchId", branchId);
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/review/readReviewList.php`, {
    method: "POST",
    body: formData,
  })
    .then((data) => data.json())
    .then((res) => {
      setBoards(res);
    });
};
