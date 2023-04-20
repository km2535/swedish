import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../../../component/ui/button/Button";
import { user_update } from "../../../api/user/updateUser";
import { user_list } from "../../../api/user/userList";
import styles from "./UserList.module.css";
import ReactPaginate from "react-paginate";

export default function UserList({
  isAdmin,
  adminList,
  setAdminList,
  setIsLoading,
  setTotalCnt,
  totalCnt,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentList, setCurrentList] = useState(adminList);
  useEffect(() => {
    const startPage = (currentPage - 1) * 10;
    const endPage = currentPage * 10;
    setCurrentList(() =>
      adminList?.filter((ele, index) => index >= startPage && index < endPage)
    );
  }, [adminList, currentPage]);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };
  const approveAdminCancle = (e) => {
    const newUser = { userid: e.target.id, approve: "true", isAdmin: "false" };
    if (window.confirm("해당 유저의 관리권한을 취소하시겠습니까?")) {
      user_update(newUser).then(() => {
        user_list(setAdminList, setIsLoading, setTotalCnt);
      });
    }
  };
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.header}>
            <th className={styles.th}>유저아이디</th>
            <th className={styles.th}>닉네임</th>
            <th className={styles.th}>전화번호</th>
            <th className={styles.th}>관리자권한</th>
          </tr>
        </thead>
        <tbody>
          {currentList.length === 0 && (
            <tr>
              <td colSpan={5} className={styles.noUser}>
                유저가 없습니다.
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
          {currentList.map((user) => (
            <tr key={uuidv4()} className={styles.tr}>
              <td className={styles.userid}>
                <span className={styles.admin}>{isAdmin && "[업소]"}</span>
                {user?.userid}
              </td>
              <td className={styles.nickname}>{user?.nickname}</td>
              <td className={styles.phone}>
                <a href={`tel:${user?.phone}`}>{user?.phone}</a>
              </td>

              <td className={styles.btn}>
                <div className={styles.btn}>
                  <Button
                    text={"취소"}
                    main={"sub"}
                    onClick={approveAdminCancle}
                    id={user?.userid}
                    // fontsize={18}
                  />
                </div>
              </td>
            </tr>
          ))}
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
    </>
  );
}
