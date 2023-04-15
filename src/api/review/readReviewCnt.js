export const readReviewCnt = async (branchId, setTotalCnt) => {
  const formData = new FormData();
  formData.append("branchId", branchId);
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/review/readReviewCnt.php`, {
    method: "POST",
    body: formData,
  })
    .then((data) => data.text())
    .then((res) => setTotalCnt(res));
};
