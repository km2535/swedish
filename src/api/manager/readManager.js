export const readManager = async (boardId, setManagerList, setIsLoading) => {
  const formData = new FormData();
  formData.append("boardId", boardId);
  setIsLoading(true);
  setTimeout(() => {
    fetch(`${process.env.REACT_APP_API_FETCH_URL}/manager/readManager.php`, {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .then((res) => {
        setManagerList(res);
      })
      .then(() => setIsLoading(false));
  }, 500);
};
