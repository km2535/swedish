import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./EditBranch.module.css";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../component/ui/button/Button";
import { branch } from "../../../api/branch/branch";
import {
  uploadBranchImg,
  uploadBranchThumb,
} from "../../../api/branch/uploadBranchFile";
import { updateBranch } from "../../../api/branch/updateBranch";
import {
  deleteBranch,
  deleteBranchImg,
  deleteBranchThumb,
} from "../../../api/branch/deleteBranch";

export default function EditBranch({ branchState }) {
  const navigate = useNavigate();
  const [board, setBoard] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [imgFiles, setImgFiles] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState("");
  const [previewFile, setPreviewFile] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  useEffect(() => {
    if (branchState === undefined) {
      const ID = uuidv4();
      setBoard((prev) => ({ ...prev, ID: ID, WRITER: "관리자" }));
    } else {
      setBoard((prev) => ({
        ...prev,
        ID: branchState.ID,
        WRITER: "관리자",
        MAPIMAGE_URL: branchState.MAPIMAGE_URL,
        THUMB_URL: branchState.THUMB_URL,
        TITLE: branchState.TITLE,
        ADDRESS: branchState.ADDRESS,
        BRANCH_PHONE: branchState.BRANCH_PHONE,
      }));
    }
  }, [branchState]);
  useEffect(() => {
    setBoard((prev) => ({ ...prev, THUMB_URL: fileUrl }));
  }, [fileUrl]);
  useEffect(() => {
    setBoard((prev) => ({ ...prev, MAPIMAGE_URL: imgUrl }));
  }, [imgUrl]);

  useEffect(() => {
    // setFileUrl([]);
    for (let i = 0; i < previewFile.length; i++) {
      setFileUrl(`${previewFile[i]?.name}`);
    }
  }, [previewFile, previewFile.length]);

  useEffect(() => {
    // setImgUrl([]);
    for (let i = 0; i < previewImg.length; i++) {
      setImgUrl(`${previewImg[i]?.name}`);
    }
  }, [previewImg, previewImg.length]);

  const changeHandler = (e) => {
    const { id, value, files } = e.target;
    if (id === "files") {
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.includes("image")) {
          setFileUrl(`${files[i]?.name}`);
          const uuid = uuidv4();
          setPreviewFile(() => [
            {
              url: URL.createObjectURL(files[i]),
              name: files[i].name,
              uuid: uuid,
              lastModified: files[i].lastModified,
            },
          ]);
          setFile(files[i]);
        }
      }
    } else if (id === "images") {
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.includes("image")) {
          setImgUrl(`${files[i]?.name}`);
          const uuid = uuidv4();
          setPreviewImg(() => [
            {
              url: URL.createObjectURL(files[i]),
              name: files[i].name,
              uuid: uuid,
              lastModified: files[i].lastModified,
            },
          ]);
          setImgFiles(files[i]);
        }
      }
    } else {
      setBoard((product) => ({ ...product, [id]: value }));
    }
  };

  const removeFile = (e) => {
    const { id } = e.target;
    setFile("");
    setPreviewFile((prev) =>
      [...prev].filter((v) => v.lastModified !== Number(id))
    );
  };
  const removeImg = (e) => {
    const { id } = e.target;
    setImgFiles("");
    setPreviewImg((prev) =>
      [...prev].filter((v) => v.lastModified !== Number(id))
    );
  };

  const deleteBranchHandler = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteBranch(board.ID);
      deleteBranchImg(board.ID);
      deleteBranchThumb(board.ID);
      navigate("/admin", { state: board });
    }
  };
  const boardSubmit = (e) => {
    e.preventDefault();
    if (branchState === undefined) {
      uploadBranchImg(imgFiles, board);
      uploadBranchThumb(file, board);
      branch(board);
      alert("지점이 추가되었습니다.");
      navigate("/admin", { state: board });
    } else {
      imgFiles && uploadBranchImg(imgFiles, board);
      file && uploadBranchThumb(file, board);
      updateBranch(board, branchState);
      navigate("/admin", { state: board });
      alert("지점이 수정되었습니다.");
    }
  };
  // console.log(board);
  return (
    <form onSubmit={boardSubmit} id="formdata" className={styles.form}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <div className={styles.downloadTitle}>지점명</div>
          <div>
            <input
              type={"text"}
              id="TITLE"
              className={styles.titleInput}
              required
              onChange={changeHandler}
              defaultValue={board?.TITLE}
              placeholder="지점명을 입력하세요"
            />
          </div>
        </div>
        <div className={styles.downloadFile}>
          <div className={styles.downloadTitle}>지점 썸네일</div>
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
                  <AiOutlineCloseSquare
                    className={styles.removeIcon}
                    id={v.lastModified}
                    onClick={removeFile}
                  />
                </div>
              ))}
              {previewFile.length === 0 && branchState ? (
                <div key={branchState.ID} className={styles.imgContent}>
                  <img
                    src={`${process.env.REACT_APP_API_DATA_URL}/branch/thumb/${branchState.ID}/${branchState?.THUMB_URL}`}
                    alt=""
                    className={styles.img}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <label className={styles.plusBtn} htmlFor="files">
            <FaPlusSquare />
          </label>
        </div>
        <div className={styles.downloadFile}>
          <div className={styles.downloadTitle}>
            오시는 길<br className={styles.next} />
            (이미지)
          </div>
          <input
            className={styles.inputFile}
            type={"file"}
            id="images"
            name="files[]"
            accept="image/*"
            onChange={changeHandler}
          />
          <div className={styles.uploadContainer}>
            <div className={styles.imgList}>
              {previewImg.map((v) => (
                <div key={v.uuid} className={styles.imgContent}>
                  <img src={v?.url} alt="" className={styles.img} />
                  <AiOutlineCloseSquare
                    className={styles.removeIcon}
                    id={v.lastModified}
                    onClick={removeImg}
                  />
                </div>
              ))}
              {previewFile.length === 0 && branchState ? (
                <div key={branchState.ID} className={styles.imgContent}>
                  <img
                    src={`${process.env.REACT_APP_API_DATA_URL}/branch/images/${branchState.ID}/${branchState?.MAPIMAGE_URL}`}
                    alt=""
                    className={styles.img}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <label className={styles.plusBtn} htmlFor="images">
            <FaPlusSquare />
          </label>
        </div>
        <div className={styles.titleContainer}>
          <div className={styles.downloadTitle}>지점명</div>
          <div>
            <input
              type={"text"}
              id="ADDRESS"
              className={styles.titleInput}
              required
              onChange={changeHandler}
              defaultValue={board?.ADDRESS}
              placeholder="주소를 입력하세요"
            />
          </div>
        </div>
        <div className={styles.titleContainer}>
          <div className={styles.downloadTitle}>지점 전화번호</div>
          <div>
            <input
              type={"text"}
              id="BRANCH_PHONE"
              className={styles.titleInput}
              required
              onChange={changeHandler}
              defaultValue={board?.BRANCH_PHONE}
              placeholder="전화번호를 입력하세요"
            />
          </div>
        </div>
        <div className={styles.btnContainer}>
          <div className={styles.btn}>
            {branchState ? (
              <Button text="수정하기" type={"submit"} />
            ) : (
              <Button text="작성하기" type={"submit"} />
            )}
          </div>
          <div className={styles.btn}>
            <Button
              text="돌아가기"
              main={"sub"}
              type={"button"}
              onClick={() => navigate(-1)}
            />
          </div>
          {branchState && (
            <div className={styles.btn}>
              <Button
                text="삭제하기"
                type={"button"}
                onClick={deleteBranchHandler}
              />
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
