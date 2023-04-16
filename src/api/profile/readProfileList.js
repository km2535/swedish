export const readProfileList = (startPage, endPage, setProfiles) => {
  const formData = new FormData();
  formData.append("startPage", startPage);
  formData.append("endPage", endPage);
  fetch(`${process.env.REACT_APP_API_FETCH_URL}/profile/readProfileList.php`, {
    method: "POST",
    body: formData,
  })
    .then((data) => data.json())
    .then((res) => {
      setProfiles(res);
    });
};
