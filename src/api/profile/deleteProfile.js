export const deleteProfile = async (product) => {
  const { ID } = product;
  const formData = new FormData();
  formData.append("ID", ID);
  await fetch(
    `${process.env.REACT_APP_API_FETCH_URL}/profile/deleteProfile.php`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const deleteProfileImg = async (product) => {
  const { ID } = product;
  const formData = new FormData();
  formData.append("fileId", ID);
  await fetch(
    `${process.env.REACT_APP_API_FETCH_URL}/profile/deleteProfileImg.php`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
