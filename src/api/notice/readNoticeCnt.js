export const readNoticeCnt = async (setTotalCnt) => {
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/notice/readNoticeCnt.php`, {
    method: "POST",
  })
    .then((data) => data.text())
    .then((res) => setTotalCnt(res));
};
