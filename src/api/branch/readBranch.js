export const readBranch = async (setBranchList, setIsLoading) => {
  const formData = new FormData();
  setIsLoading(true);
  setTimeout(() => {
    fetch(`${process.env.REACT_APP_API_FETCH_URL}/branch/readBranch.php`, {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .then((res) => {
        setBranchList(res);
      })
      .then(() => setIsLoading(false));
  }, 500);
};
