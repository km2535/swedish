export const login_user = async (user, setUser, setWarnning, setStay) => {
  const { userid, password } = user;
  const formData = new FormData();
  formData.append("userid", userid);
  formData.append("password", password);
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/user/loginUser.php`, {
    method: "POST",
    body: formData,
  })
    .then((data) => data.json())
    .then((res) => {
      if (res.length > 0) {
        for (const v of res) {
          setUser({
            userid: v.userid,
            nickname: v.nickname,
            phone: v.phone,
            isAdmin: v.isAdmin,
            superAdmin: v.superAdmin,
            approve: v.approve,
            date: v.date,
          });
          if (v.approve === "false") {
            setStay(true);
          }
        }

        setWarnning(false);
      } else {
        setWarnning(true);
        setUser(null);
      }
    });
};
