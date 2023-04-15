export const readNotice = async (startPage, endPage, setBoards) => {
  const formData = new FormData();
  formData.append("startPage", startPage);
  formData.append("endPage", endPage);
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/notice/readNoticeList.php`, {
    method: "POST",
    body: formData,
  })
    .then((data) => data.json())
    .then((res) => {
      setBoards(res);
    });
};
