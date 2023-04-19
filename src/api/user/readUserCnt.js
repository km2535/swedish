export const readApproveUserCnt = async (setTotalCnt) => {
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/user/approveUserListCnt.php`, {
    method: "POST",
  })
    .then((data) => data.text())
    .then((res) => setTotalCnt(res));
};
export const noneReadApproveUserCnt = async (setTotalCnt) => {
  fetch(
    `${process.env.REACT_APP_API_FETCH_URL}/user/noneReadApproveUserCnt.php`,
    {
      method: "POST",
    }
  )
    .then((data) => data.text())
    .then((res) => setTotalCnt(res));
};
