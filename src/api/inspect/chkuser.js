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
