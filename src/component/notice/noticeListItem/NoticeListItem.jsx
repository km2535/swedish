import React, { useEffect, useState } from "react";
import NoticeItem from "../noticeItem/NoticeItem";
import { readNotice } from "../../../api/notice/readNotice";

export default function NoticeListItem({ page, totalPage }) {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    const startPage = (page - 1) * 10;
    const endPage = 10;
    // notice && readBoards(startPage, endPage, setBoards);
    // qna && readQnas(startPage, endPage, setBoards);
    readNotice(startPage, endPage, setBoards);
  }, [page]);
  return (
    <>
      {boards?.map((Item, index) => (
        <NoticeItem
          key={Item?.id}
          Item={Item}
          index={index}
          page={page}
          totalPage={totalPage}
        />
      ))}
    </>
  );
}
