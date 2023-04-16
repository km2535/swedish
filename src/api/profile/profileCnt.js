export const profileCnt = (setTotalCnt) => {
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/profile/profileCnt.php`, {
    method: "POST",
  })
    .then((data) => data.text())
    .then((res) => {
      setTotalCnt(res);
    });
};
