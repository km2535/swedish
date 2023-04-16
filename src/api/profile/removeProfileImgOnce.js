export const removeProfileImgOnce = async (product) => {
  const { id, fileName } = product;
  const formData = new FormData();
  formData.append("fileId", id);
  formData.append("fileName", fileName);

  await fetch(
    `${process.env.REACT_APP_API_FETCH_URL}/profile/removeProfileImgOnce.php`,
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
