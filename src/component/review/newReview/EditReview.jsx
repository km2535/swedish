import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { uploadReviewImg } from "../../../api/review/uploadReviewImg";
import styles from "./NewReview.module.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "../../ui/button/Button";
import { updateReview } from "../../../api/review/updateReview";

export default function EditReview() {
  const navigate = useNavigate();
  const {
    state: {
      Item: { id, branchId, content, title, writer },
    },
  } = useLocation();
  const [board, setBoard] = useState({
    id: id,
    branchId: branchId,
    title: title,
    writer: writer,
    content: content,
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
      updateReview(board)
        .then(() => window.alert("글을 수정하였습니다."))
        .then(() => navigate(-2));
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
          defaultValue={title}
          onChange={onChangeHandler}
          required
        />
      </div>
      <div>
        <CKEditor
          editor={ClassicEditor}
          data={content}
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
            <Button type={"submit"} text={"수정하기"} />
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
