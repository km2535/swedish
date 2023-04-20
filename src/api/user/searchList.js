export const approveSearchList = async (
  setUserSearchList,
  setTotalCnt,
  setIsLoading,
  search
) => {
  const { kind, keyword } = search;
  setIsLoading(true);
  const formData = new FormData();
  formData.append("kind", kind);
  formData.append("keyword", "%" + keyword + "%");
  setTimeout(() => {
    fetch(`${process.env.REACT_APP_API_FETCH_URL}/user/approveSearchList.php`, {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .then((userList) => {
        setUserSearchList(userList);
        setTotalCnt(userList.length);
      })
      .then(() => setIsLoading(false));
  }, 500);
};

export const noneApproveSearchList = async (
  setUserSearchList,
  setSearchTotalCnt,
  setIsLoading,
  search
) => {
  const { kind, keyword } = search;
  setIsLoading(true);
  const formData = new FormData();
  formData.append("kind", kind);
  formData.append("keyword", "%" + keyword + "%");
  setTimeout(() => {
    fetch(
      `${process.env.REACT_APP_API_FETCH_URL}/user/noneApproveSearchList.php`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((data) => data.json())
      .then((userList) => {
        setUserSearchList(userList);
        setSearchTotalCnt(userList.length);
      })
      .then(() => setIsLoading(false));
  }, 500);
};
