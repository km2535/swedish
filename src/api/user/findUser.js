export const findUser = async (user, setWarnning, setUserId) => {
  const { phone } = user;
  const formData = new FormData();

  formData.append("phone", phone);

  fetch(`${process.env.REACT_APP_API_FETCH_URL}/user/findUser.php`, {
    method: "POST",
    body: formData,
  })
    .then((data) => data.json())
    .then((res) => {
      if (res.length > 0) {
        for (const v of res) {
          setUserId({
            userid: v.userid,
          });
        }
        setWarnning(false);
      } else {
        setWarnning(true);
        setUserId(null);
      }
    });
};
export const findUserPw = async (user, setWarnning, setUserId) => {
  const { answer, question, userid } = user;
  const formData = new FormData();

  formData.append("userid", userid);
  formData.append("question", question);
  formData.append("answer", answer);

  fetch(`${process.env.REACT_APP_API_FETCH_URL}/user/findUserPw.php`, {
    method: "POST",
    body: formData,
  })
    .then((data) => data.json())
    .then((res) => {
      if (res.length > 0) {
        for (const v of res) {
          setUserId({
            password: v.password,
          });
        }
        setWarnning(false);
      } else {
        setWarnning(true);
        setUserId(null);
      }
    });
};
