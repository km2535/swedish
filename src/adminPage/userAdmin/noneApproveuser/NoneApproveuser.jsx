import React from "react";
import styles from "./NoneApproveuser.module.css";
import Button from "../../../component/ui/button/Button";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import UserLists from "../userLists/UserLists";
import LoadingSpinner from "../../../component/loadingSpinner/LoadingSpinner";
import { useState } from "react";
import { useEffect } from "react";
import { noneReadApproveUserCnt } from "../../../api/user/readUserCnt";
import { noneApproveUserList } from "../../../api/user/userList";
import SearchUser from "../searchUser/SearchUser";
import SearchList from "../searchList/SearchList";

export default function NoneApproveuser() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [userSearchList, setUserSearchList] = useState([]);
  const [searchTotalCnt, setSearchTotalCnt] = useState(0);
  const [searchBtn, setSearchBtn] = useState(false);
  //비승인 유저 로직
  useEffect(() => {
    noneReadApproveUserCnt(setTotalCnt);
  }, [userList]);
  useEffect(() => {
    const startPage = (currentPage - 1) * 10;
    const endPage = 10;
    noneApproveUserList(startPage, endPage, setUserList, setIsLoading);
  }, [currentPage]);
  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };
  return (
    <div>
      <div>
        <div className={styles.mainTitle}>신규가입</div>
      </div>
      <div className={styles.optionContainer}>
        <div className={styles.default}>
          <Button
            main={"false"}
            text={"승인유저"}
            type={"button"}
            onClick={() => navigate(`/admin/userList`)}
          />
        </div>
        <div className={styles.manager}>
          <Button main={"false"} text={"미승인 유저"} />
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
                isNoneApprove={true}
              />
            ) : (
              <UserLists
                currentPage={currentPage}
                userList={userList}
                setUserList={setUserList}
                setIsLoading={setIsLoading}
                isNoneApprove={true}
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
          approve={"false"}
          setIsLoading={setIsLoading}
          setSearchTotalCnt={setSearchTotalCnt}
          setSearchBtn={setSearchBtn}
        />
      </div>
    </div>
  );
}
