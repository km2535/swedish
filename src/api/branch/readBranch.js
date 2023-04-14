export const readBranch = async (setBranchList) => {
  const formData = new FormData();
  setTimeout(() => {
    fetch(`${process.env.REACT_APP_API_FETCH_URL}/branch/readBranch.php`, {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .then((res) => {
        setBranchList(res);
      });
  }, 500);
};
