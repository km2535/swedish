import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import styles from "./NewProfile.module.css";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";
import Button from "../../../component/ui/button/Button";
import { uploadProfileImg } from "../../../api/profile/uploadProfileImg";
import { uploadProfile } from "../../../api/profile/uploadProfile";

export default function NewProfile() {
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [product, setProduct] = useState([]);
  const [preview, setPreview] = useState([]);
  useEffect(() => {
    const ID = uuidv4();
    setProduct((product) => ({ ...product, ID: ID }));
  }, []);

  useEffect(() => {
    setProduct((product) => ({ ...product, IMAGE_URLS: imgUrl }));
  }, [imgUrl]);

  useEffect(() => {
    setImgUrl([]);
    for (let i = 0; i < preview.length; i++) {
      setImgUrl((prev) => [...prev, `${preview[i]?.name}`]);
    }
    setProduct((product) => ({
      ...product,
      THUMBNAIL_IMG: `${preview[0]?.name}`,
    }));
  }, [preview, preview.length]);

  const changeHandler = (e) => {
    const { id, value, files } = e.target;
    if (id === "files") {
      const options = {
        maxSizeMb: 1,
        maxWidthOrHeight: 1500,
      };
      for (let i = 0; i < files.length; i++) {
        //이미지의 경로를 지정함.
        setImgUrl((prev) => [...prev, `${files[i]?.name}`]);
        //이미지 압축하고 이미지를 나열함.
        const uuid = uuidv4();
        imageCompression(files[i], options).then((v) => {
          setPreview((prev) => [
            ...prev,
            {
              url: URL.createObjectURL(v),
              name: v.name,
              uuid: uuid,
              lastModified: v.lastModified,
            },
          ]);
          setImgFiles((prev) => [...prev, v]);
        });
      }
      setProduct((product) => ({
        ...product,
        THUMBNAIL_IMG: `${files[0]?.name}`,
      }));
    } else {
      setProduct((product) => ({ ...product, [id]: value }));
    }
  };

  const removeImg = (e) => {
    const { id } = e.target;
    setImgFiles((prev) =>
      [...prev].filter((v) => v.lastModified !== Number(id))
    );
    setPreview((prev) =>
      [...prev].filter((v) => v.lastModified !== Number(id))
    );
  };

  const fileSubmit = (e) => {
    e.preventDefault();
    console.log(imgFiles, product);
    //이미지를 업로드하는 함수
    uploadProfileImg(imgFiles, product);
    uploadProfile(product);
    // productImgUpload(imgFiles, product);
    // //경로를 만든 이미지 배열을 해당 products 함수로 넘김
    // uploadProducts(product);
    window.alert("프로필이 추가되었습니다.");
    navigate("/admin/profileManager");
  };
  return (
    <>
      <form onSubmit={fileSubmit} id="formdata" className={styles.form}>
        <div className={styles.titleContainer}>
          <div className={styles.titleDescription}>
            <div className={styles.Title}>프로필명</div>
          </div>
          <input
            type={"text"}
            id="TITLE"
            className={styles.titleInput}
            required
            onChange={changeHandler}
            placeholder="프로필명을 입력하세요"
          />
        </div>
        <div className={styles.imgContainer}>
          <div className={styles.imgDescription}>
            <div className={styles.imgTitle}>프로필 이미지</div>
            <div className={styles.imgSub}>
              ※ 첫 이미지가 썸네일 사진입니다.
            </div>
          </div>
          <input
            type={"file"}
            id="files"
            accept="image/*"
            name="files[]"
            multiple={"multiple"}
            onChange={changeHandler}
            className={styles.imgUpload}
          ></input>
          <div className={styles.uploadContainer}>
            <div className={styles.imgList}>
              {preview.map((v) => (
                <div key={v.uuid} className={styles.imgContent}>
                  <div className={styles.imgs}>
                    <img src={v?.url} alt="" className={styles.img} />
                  </div>
                  <AiOutlineCloseSquare
                    id={v.lastModified}
                    onClick={removeImg}
                  />
                </div>
              ))}
            </div>
          </div>
          <label className={styles.plusBtn} htmlFor="files">
            <FaPlusSquare />
          </label>
        </div>
        <div className={styles.detailContainer}>
          <div className={styles.detailDescription}>
            <div className={styles.detailTitle}>프로필 상세내용</div>
          </div>
          <textarea
            type={"text"}
            placeholder="프로필의 상세내용을 작성해주세요 150자 이하 작성"
            id="DETAIL_DESCRIPTION"
            className={styles.detailInput}
            rows="5"
            maxLength={180}
            required
            onChange={changeHandler}
          />
        </div>

        <div className={styles.btn}>
          <Button text="작성하기" type={"submit"} />
          <Button
            text="돌아가기"
            main={"sub"}
            type={"button"}
            onClick={() => navigate(-1)}
          />
        </div>
      </form>
    </>
  );
}
