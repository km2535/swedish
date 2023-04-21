import React, { useState } from "react";
import styles from "./DesignSkin.module.css";
import { v4 as uuid } from "uuid";
import Button from "../../component/ui/button/Button";
import { newSkin } from "../../api/skin/newSkin";

export default function DesignSkin() {
  const [file, setFile] = useState("");
  const [previewFile, setPreviewFile] = useState([
    {
      uuid: uuid(),
      url: `${process.env.REACT_APP_API_DATA_URL}/skin/images/bg.jpg`,
    },
  ]);
  const changeHandler = (e) => {
    const { id, files } = e.target;
    // let ext = "";
    if (id === "files") {
      for (let i = 0; i < files.length; i++) {
        if (
          files[i].type.includes("image/jpeg") ||
          files[i].type.includes("image/jpg")
        ) {
          setPreviewFile(() => [
            {
              url: URL.createObjectURL(files[i]),
              name: files[i].name,
              uuid: uuid(),
              lastModified: files[i].lastModified,
            },
          ]);
          // ext = files[i].name.split(".").pop();
        } else {
          window.alert("그림(.jpg) 파일만 업로드해주세요");
        }
      }
      const newFile = new File(files, `bg.jpg`);
      setFile(newFile);
    }
  };
  const uploadSubmit = (e) => {
    e.preventDefault();
    newSkin(file).then(() => window.alert("수정되었습니다."));
  };
  return (
    <form onSubmit={uploadSubmit} className={styles.container}>
      <div className={styles.mainTitle}>스킨변경</div>
      <div className={styles.downloadFile}>
        <input
          className={styles.inputFile}
          type={"file"}
          id="files"
          accept="image/jpg"
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
                <span className={styles.txt}>클릭해서 썸네일 사진 추가</span>
                <span className={styles.txt}>
                  (실제 상품사진은 크게 보입니다.)
                </span>
              </>
            )}
          </div>
        </label>
      </div>
      <div className={styles.btn}>
        <div className={styles.submitBtn}>
          <Button type={"submit"} text={"수정하기"} fontsize={20} />
        </div>
      </div>
    </form>
  );
}
