import React, { useEffect, useState } from "react";
import ReviewItem from "../reviewItem/ReviewItem";
import { readReview } from "../../../api/review/readReview";

export default function ReviewListItem({ branchId, page, totalPage }) {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    const startPage = (page - 1) * 10;
    const endPage = 10;
    readReview(branchId, startPage, endPage, setBoards);
  }, [branchId, page]);
  return (
    <>
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
