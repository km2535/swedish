export const readReplyCnt = async (boardId, setTotalCnt, setMoreBtn) => {
  const formData = new FormData();
  formData.append("boardId", boardId);
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/reply/readReplyCnt.php`, {
    method: "POST",
    body: formData,
  })
    .then((data) => data.text())
    .then((res) => setTotalCnt(res))
    .then(() => setMoreBtn(true));
};
