import React, { useState } from "react";
import styles from "./Review.module.css";
import ReviewList from "../../../component/review/ReviewList";
import Button from "../../../component/ui/button/Button";
import { useLocation, useNavigate } from "react-router-dom";

export default function Review() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [id] = useState(state);
  return (
    <div className={styles.container}>
      <div className={styles.mainTitle}>후기게시판</div>
      <ReviewList branchId={id} />
      <div className={styles.btnContainer}>
        <div className={styles.btn}>
          <Button
            text={"작성하기"}
            onClick={() => navigate("newReview", { state: state })}
          />
        </div>
      </div>
    </div>
  );
}
