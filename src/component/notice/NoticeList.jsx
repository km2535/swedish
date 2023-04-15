import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import styles from "./NoticeList.module.css";
import { readNoticeCnt } from "../../api/notice/readNoticeCnt";
import NoticeListItem from "./noticeListItem/NoticeListItem";

export default function NoticeList({ isAdmin }) {
  const [totalCnt, setTotalCnt] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  //여기서 게시판의 데이터를 읽는다.
  useEffect(() => {
    readNoticeCnt(setTotalCnt);
    // qna && readQnaCnt(setTotalCnt);
  }, []);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.theadTr}>
            <th>번호</th>
            <th className={styles.thTitle}>제목</th>
            <th className={styles.thWriter}>작성자</th>
            <th className={styles.thDate}>작성일</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          <NoticeListItem page={currentPage} totalPage={totalCnt} />
        </tbody>
      </table>
      <ReactPaginate
        breakLabel={""}
        previousLabel={"<"}
        nextLabel={">"}
        onPageChange={handlePageClick}
        pageCount={Math.ceil(totalCnt / 10)}
        pageRangeDisplayed={10}
        marginPagesDisplayed={10}
        containerClassName={styles.pagination}
        activeClassName={styles.current}
        pageClassName={styles.item}
        previousClassName={styles.prev}
        nextClassName={styles.next}
      />
    </div>
  );
}
