export const delete_user = async (newUser) => {
  const formData = new FormData();
  formData.append("userid", newUser?.userid);
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/user/deleteUser.php`, {
    method: "POST",
    body: formData,
  }).then((res) => res);
};
