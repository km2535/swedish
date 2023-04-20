import React, { useEffect, useState } from "react";
import styles from "./Approveuser.module.css";
import Button from "../../../component/ui/button/Button";
import { useNavigate } from "react-router-dom";
import { approveUserList } from "../../../api/user/userList";
import LoadingSpinner from "../../../component/loadingSpinner/LoadingSpinner";
import UserLists from "../userLists/UserLists";
import { readApproveUserCnt } from "../../../api/user/readUserCnt";
import ReactPaginate from "react-paginate";
import SearchUser from "../searchUser/SearchUser";
import SearchList from "../searchList/SearchList";

export default function Approveuser() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [userSearchList, setUserSearchList] = useState([]);
  const [searchTotalCnt, setSearchTotalCnt] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchBtn, setSearchBtn] = useState(false);
  //승인 유저 로직
  useEffect(() => {
    readApproveUserCnt(setTotalCnt);
  }, [userList]);
  useEffect(() => {
    const startPage = (currentPage - 1) * 10;
    const endPage = 10;
    approveUserList(startPage, endPage, setUserList, setIsLoading);
  }, [currentPage]);
  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };
  //검색알고리즘 추가
  return (
    <div>
      <div>
        <div className={styles.mainTitle}>신규가입</div>
      </div>
      <div className={styles.optionContainer}>
        <div className={styles.default}>
          <Button main={"false"} text={"승인유저"} type={"button"} />
        </div>
        <div className={styles.manager}>
          <Button
            main={"false"}
            text={"미승인 유저"}
            onClick={() => navigate(`/admin/noneApprove`)}
          />
        </div>
      </div>
      <div className={styles.content}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {searchBtn ? (
              <SearchList
                searchTotalCnt={searchTotalCnt}
                userSearchList={userSearchList}
                setUserList={setUserList}
                setIsLoading={setIsLoading}
                setSearchBtn={setSearchBtn}
              />
            ) : (
              <UserLists
                currentPage={currentPage}
                userList={userList}
                setUserList={setUserList}
                setIsLoading={setIsLoading}
              />
            )}
          </>
        )}

        {searchBtn || (
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
        )}
        <SearchUser
          setUserSearchList={setUserSearchList}
          approve={"true"}
          setIsLoading={setIsLoading}
          setSearchTotalCnt={setSearchTotalCnt}
          setSearchBtn={setSearchBtn}
        />
      </div>
    </div>
  );
}
