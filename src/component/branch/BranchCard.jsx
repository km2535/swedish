import React from "react";
import styles from "./BranchCard.module.css";
import { useNavigate } from "react-router-dom";

export default function BranchCard({ branch }) {
  const navigate = useNavigate();
  return (
    <div
      className={styles.container}
      onClick={() => navigate(`/swedish/${branch.ID}`, { state: branch })}
    >
      <div className={styles.imgContainer}>
        <img
          className={styles.img}
          src={`${process.env.REACT_APP_API_DATA_URL}/branch/thumb/${branch.ID}/${branch.THUMB_URL}`}
          alt=""
        />
      </div>
      <div className={styles.title}>{branch.TITLE}</div>
    </div>
  );
}
