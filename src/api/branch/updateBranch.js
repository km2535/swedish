export const updateBranch = async (board, branchState) => {
  const { ID, WRITER, TITLE, ADDRESS, MAPIMAGE_URL, THUMB_URL, BRANCH_PHONE } =
    board;
  const formData = new FormData();

  MAPIMAGE_URL === ""
    ? formData.append("MAPIMAGE_URL", branchState.MAPIMAGE_URL)
    : formData.append("MAPIMAGE_URL", MAPIMAGE_URL);
  THUMB_URL === ""
    ? formData.append("THUMB_URL", branchState.THUMB_URL)
    : formData.append("THUMB_URL", THUMB_URL);

  formData.append("ID", ID);
  formData.append("WRITER", WRITER);
  formData.append("TITLE", TITLE);
  formData.append("ADDRESS", ADDRESS);
  formData.append("BRANCH_PHONE", BRANCH_PHONE);
  await fetch(
    `${process.env.REACT_APP_API_FETCH_URL}/branch/updateBranch.php`,
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
