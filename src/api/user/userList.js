// 관리자만 불러오기
export const user_list = async (setAdminList, setIsLoading, totalCnt) => {
  const formData = new FormData();
  setAdminList([]);
  setIsLoading(true);
  setTimeout(() => {
    fetch(`${process.env.REACT_APP_API_FETCH_URL}/user/userList.php`, {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .then((userList) => {
        totalCnt(userList.length);
        setAdminList(userList);
      })
      .then(() => setIsLoading(false));
  }, 500);
};

//승인된 유저만 불러오기
export const approveUserList = async (
  startPage,
  endPage,
  setUserList,
  setIsLoading
) => {
  setIsLoading(true);
  const formData = new FormData();
  formData.append("startPage", startPage);
  formData.append("endPage", endPage);
  setTimeout(() => {
    fetch(`${process.env.REACT_APP_API_FETCH_URL}/user/approveUserList.php`, {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .then((userList) => {
        setUserList(userList);
      })
      .then(() => setIsLoading(false));
  }, 500);
};
export const noneApproveUserList = async (
  startPage,
  endPage,
  setUserList,
  setIsLoading
) => {
  setIsLoading(true);
  const formData = new FormData();
  formData.append("startPage", startPage);
  formData.append("endPage", endPage);
  setTimeout(() => {
    fetch(
      `${process.env.REACT_APP_API_FETCH_URL}/user/noneApproveUserList.php`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((data) => data.json())
      .then((userList) => {
        setUserList(userList);
      })
      .then(() => setIsLoading(false));
  }, 500);
};
