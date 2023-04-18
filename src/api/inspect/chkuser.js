export const chk_user_id = async (userid, setDuplication) => {
  const formData = new FormData();
  formData.append("userid", userid);
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/user/checkDuplication.php`, {
    method: "POST",
    body: formData,
  })
    .then((data) => data.text())
    .then((res) => {
      res.length > 0 ? setDuplication(false) : setDuplication(true);
    });
};
export const chk_user_nickname = async (nickname, setDuplinickname) => {
  const formData = new FormData();
  formData.append("nickname", nickname);
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/user/checkDupliNickname.php`, {
    method: "POST",
    body: formData,
  })
    .then((data) => data.text())
    .then((res) => {
      res.length > 0 ? setDuplinickname(false) : setDuplinickname(true);
    });
};
