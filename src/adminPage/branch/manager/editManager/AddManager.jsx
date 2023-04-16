import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { v4 as uuid } from "uuid";
import Button from "../../../../component/ui/button/Button";
import { uploadManagerImg } from "../../../../api/manager/uploadManagerImg";
import { useLocation, useNavigate } from "react-router-dom";
import { uploadManager } from "../../../../api/manager/uploadManager";
import styles from "./AddManager.module.css";
import { uploadManagerThumb } from "../../../../api/manager/uploadManagerThumb";

export default function AddManager() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState("");
  const [previewFile, setPreviewFile] = useState([]);
  const [board, setBoard] = useState({
    id: uuid(),
    nf: false,
    boardId: state?.ID,
    content: "",
    title: "",
    describe: "",
    worktime: "",
  });
  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          loader.file.then((file) => {
            uploadManagerImg(file, board, resolve);
          });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }
  const onChangeHandler = (e) => {
    const id = e.target.id;
    switch (id) {
      case "title":
        setBoard((prev) => ({ ...prev, [id]: e.target.value }));
        break;
      case "nf":
        setBoard((prev) => ({ ...prev, [id]: e.target.checked }));
        break;
      case "describe":
        setBoard((prev) => ({ ...prev, [id]: e.target.value }));
        break;
      case "worktime":
        setBoard((prev) => ({ ...prev, [id]: e.target.value }));
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    setBoard((prev) => ({ ...prev, thumb_img: fileUrl }));
  }, [fileUrl]);

  const changeHandler = (e) => {
    const { id, files } = e.target;
    if (id === "files") {
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.includes("image")) {
          setFileUrl(`${files[i]?.name}`);

          setPreviewFile(() => [
            {
              url: URL.createObjectURL(files[i]),
              name: files[i].name,
              uuid: uuid(),
              lastModified: files[i].lastModified,
            },
          ]);
          setFile(files[i]);
        }
      }
    }
  };
  const uploadSubmit = (e) => {
    e.preventDefault();
    uploadManagerThumb(file, board);
    board.content === "" && window.alert("글을 입력해주세요.");
    board.content === "" || uploadManager(board).then(() => navigate(-1));
  };
  return (
    <form onSubmit={uploadSubmit} className={styles.container}>
      <div className={styles.content}>
        <div className={styles.downloadFile}>
          <input
            className={styles.inputFile}
            type={"file"}
            id="files"
            accept="image/*"
            name="files[]"
            onChange={changeHandler}
          />
          <div className={styles.uploadContainer}>
            <div className={styles.imgList}>
              {previewFile.map((v) => (
                <div key={v.uuid} className={styles.imgContent}>
                  <img src={v?.url} alt="" className={styles.img} />
                </div>
              ))}
              {previewFile.length === 0 && previewFile ? (
                <div key={previewFile.ID} className={styles.imgContent}>
                  <div className={styles.img} />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <label className={styles.plusBtn} htmlFor="files">
            <div className={styles.imgbox}>
              {previewFile.length === 0 && (
                <>
                  <span className={styles.txt1}>클릭해서 썸네일 사진 추가</span>
                  <span className={styles.txt2}>
                    (실제 사진은 크게 보입니다.)
                  </span>
                </>
              )}
            </div>
          </label>
        </div>
        <div className={styles.mainInfo}>
          <div className={styles.inputInfo}>
            <input
              placeholder="매니저명"
              type="text"
              name=""
              id="title"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className={styles.inputInfo}>
            <input
              placeholder="간단한 소개"
              type="text"
              name=""
              id="describe"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className={styles.inputInfo}>
            <input
              placeholder="워크타임"
              type="text"
              name=""
              id="worktime"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div>
            <input type="checkbox" id="nf" onChange={onChangeHandler} />
            <label htmlFor="nf">NF</label>
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
      <CKEditor
        editor={ClassicEditor}
        data="<p>소개글...</p>"
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
          <Button onClick={() => navigate(-1)} main={"sub"} text={"돌아가기"} />
        </div>
      </div>
    </form>
  );
}
