export const joinUser = async (user) => {
  const { userid, nickname, password, question, answer, phone } = user;
  const formData = new FormData();

  formData.append("userid", userid);
  formData.append("nickname", nickname);
  formData.append("password", password);
  formData.append("question", question);
  formData.append("answer", answer);
  formData.append("phone", phone);
  formData.append("approve", "false");
  formData.append("isAdmin", "false");
  formData.append("superAdmin", "false");

  fetch(`${process.env.REACT_APP_API_FETCH_URL}/user/createUser.php`, {
    method: "POST",
    body: formData,
  }).then((res) => res);
};
