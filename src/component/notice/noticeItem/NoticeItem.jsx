import React, { useEffect, useState } from "react";
import styles from "./NoticeItem.module.css";
import { useNavigate } from "react-router-dom";

export default function NoticeItem({ Item, index, page, totalPage }) {
  const navigate = useNavigate();
  const { id, title, writer, date } = Item;
  const [boardNum, setBoardNum] = useState(totalPage);

  const clickHandler = (e) => {
    const { id } = e.target;
    navigate(`${id}`, {
      state: { Item },
    });
  };
  useEffect(() => {
    const boardNumber = totalPage - (page - 1) * 10 - index;
    if (boardNumber > 0) {
      setBoardNum(boardNumber);
    }
  }, [totalPage, index, page]);

  return (
    <>
      <tr className={styles.tbodyTr}>
        <td className={styles.tdNum}>{boardNum}</td>
        <td className={styles.tdTitle} id={id} onClick={clickHandler}>
          {title}
        </td>
        <td className={styles.tdWriter}>{writer}</td>
        <td className={styles.tdDate}>{date}</td>
      </tr>
    </>
  );
}
