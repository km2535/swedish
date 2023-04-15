import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import styles from "./NewReview.module.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "../../ui/button/Button";
import { useAuthContext } from "../../../context/AuthContextProvider";
import { uploadReviewImg } from "../../../api/review/uploadReviewImg";
import { uploadReview } from "../../../api/review/uploadReview";

export default function NewReview() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = useAuthContext();
  const [board, setBoard] = useState({
    id: uuid(),
    branchId: state,
    title: "",
    writer: user?.nickname || "홍길동",
  });
  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          loader.file.then((file) => {
            uploadReviewImg(file, board, resolve);
          });
        });
      },
    };
  };
  const onChangeHandler = (e) => {
    const id = e.target.id;
    switch (id) {
      case "title":
        setBoard((prev) => ({ ...prev, [id]: e.target.value }));
        break;

      default:
        break;
    }
  };
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }
  const uploadSubmit = (e) => {
    e.preventDefault();
    board.content === undefined && window.alert("글을 입력해주세요.");
    board.content === undefined ||
      uploadReview(board)
        .then(() => window.alert("글을 등록하였습니다."))
        .then(() => navigate(-1));
  };
  return (
    <form onSubmit={uploadSubmit} className={styles.container}>
      <div className={styles.mainTitle}>후기게시판</div>
      <div className={styles.titleInput}>
        <div className={styles.title}>제목</div>
        <input
          placeholder="제목을 입력해주세요"
          className={styles.input}
          type="text"
          id="title"
          onChange={onChangeHandler}
          required
        />
      </div>
      <div>
        <CKEditor
          editor={ClassicEditor}
          data="<p>공지사항.</p>"
          config={{
            // (4)
            extraPlugins: [uploadPlugin],
          }}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            // console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();

            setBoard((prev) => ({ ...prev, content: data }));
            // console.log(editor.data);
          }}
          onBlur={(event, editor) => {
            // console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            // console.log("Focus.", editor);
          }}
        />
        <div className={styles.btn}>
          <div className={styles.submitBtn}>
            <Button type={"submit"} text={"저장하기"} />
          </div>
          <div className={styles.submitBtn}>
            <Button
              onClick={() => navigate(-1)}
              type={"button"}
              main={"sub"}
              text={"돌아가기"}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
