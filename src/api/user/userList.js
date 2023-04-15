export const user_list = async (
  setNoneApproveList,
  setApproveList,
  setAdminList,
  setIsLoading
) => {
  const formData = new FormData();
  setNoneApproveList([]);
  setApproveList([]);
  setAdminList([]);
  setIsLoading(true);
  setTimeout(() => {
    fetch(`${process.env.REACT_APP_API_FETCH_URL}/user/userList.php`, {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .then((userList) => {
        for (const user of userList) {
          if (user?.approve === "false") {
            setNoneApproveList((prev) => [...prev, user]);
          } else if (user?.approve === "true" && user?.isAdmin === "false") {
            setApproveList((prev) => [...prev, user]);
          } else if (user?.approve === "true" && user?.isAdmin === "true") {
            setAdminList((prev) => [...prev, user]);
          }
        }
      })
      .then(() => setIsLoading(false));
  }, 500);
};
