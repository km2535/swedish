export const user_update = async (newUser) => {
  const formData = new FormData();
  formData.append("userid", newUser?.userid);
  formData.append("approve", newUser?.approve);
  formData.append("isAdmin", newUser?.isAdmin);
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/user/updateUser.php`, {
    method: "POST",
    body: formData,
  }).then((res) => res);
};
