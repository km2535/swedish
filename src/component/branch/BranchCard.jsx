import React from "react";
import styles from "./BranchCard.module.css";
import { useNavigate } from "react-router-dom";

export default function BranchCard({ branch }) {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div
        className={styles.imgContainer}
        onClick={() => navigate(`/swedish/${branch.ID}`, { state: branch })}
      >
        <img
          className={styles.img}
          src={`${process.env.REACT_APP_API_DATA_URL}/branch/thumb/${branch.ID}/${branch.THUMB_URL}`}
          alt=""
        />
        <div className={styles.title}>{branch.TITLE}</div>
      </div>
    </div>
  );
}
