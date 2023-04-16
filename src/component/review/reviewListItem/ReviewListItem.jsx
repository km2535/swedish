import React, { useEffect, useState } from "react";
import ReviewItem from "../reviewItem/ReviewItem";
import { readReview } from "../../../api/review/readReview";
import styles from "./ReviewListItem.module.css";

export default function ReviewListItem({ branchId, page, totalPage }) {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    const startPage = (page - 1) * 10;
    const endPage = 10;
    readReview(branchId, startPage, endPage, setBoards);
  }, [branchId, page]);
  return (
    <>
      {boards.length === 0 && (
        <tr className={styles.tbodyTr}>
          <td className={styles.tdNum} colSpan={4}>
            아직 후기가 없습니다.
          </td>
          <td className={styles.tdTitle}></td>
          <td className={styles.tdWriter}></td>
          <td className={styles.tdDate}></td>
        </tr>
      )}
      {boards?.map((Item, index) => (
        <ReviewItem
          key={Item?.id}
          Item={Item}
          branchId={branchId}
          index={index}
          page={page}
          totalPage={totalPage}
        />
      ))}
    </>
  );
}
