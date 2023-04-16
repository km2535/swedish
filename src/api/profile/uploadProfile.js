export const uploadProfile = async (product) => {
  const { ID, TITLE, DETAIL_DESCRIPTION, THUMBNAIL_IMG, IMAGE_URLS } = product;
  const formData = new FormData();
  formData.append("ID", ID);
  formData.append("TITLE", TITLE);
  formData.append("DETAIL_DESCRIPTION", DETAIL_DESCRIPTION);
  formData.append("THUMBNAIL_IMG", THUMBNAIL_IMG);
  formData.append("IMAGE_URLS", IMAGE_URLS);
  await fetch(
    `${process.env.REACT_APP_API_FETCH_URL}/profile/uploadProfile.php`,
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
