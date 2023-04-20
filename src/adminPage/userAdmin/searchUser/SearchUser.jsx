import React, { useRef, useState } from "react";
import Button from "../../../component/ui/button/Button";
import {
  approveSearchList,
  noneApproveSearchList,
} from "../../../api/user/searchList";
import styles from "./SearchUser.module.css";

export default function SearchUser({
  approve,
  setSearchTotalCnt,
  setSearchBtn,
  setIsLoading,
  setUserSearchList,
}) {
  const input = useRef();
  const [search, setSearch] = useState({
    kind: "phone",
    keyword: "",
  });

  const changeHandler = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setSearch((prev) => ({ ...prev, [id]: value }));
  };
  const reset = () => {
    setSearchBtn(false);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(search);
    setSearchBtn(true);
    switch (approve) {
      case "true":
        //승인유저 중에 검색
        approveSearchList(
          setUserSearchList,
          setSearchTotalCnt,
          setIsLoading,
          search
        );

        break;
      case "false":
        //미승인유저 중에 검색
        console.log(search);
        noneApproveSearchList(
          setUserSearchList,
          setSearchTotalCnt,
          setIsLoading,
          search
        );
        break;

      default:
        break;
    }
    input.current.value = "";
  };
  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <div className={styles.content}>
        <div className={styles.searchOption}>
          <select
            className={styles.select}
            name=""
            id="kind"
            onChange={changeHandler}
          >
            <option value="phone">전화번호</option>
            <option value="userid">아이디</option>
            <option value="nickname">닉네임</option>
            <option value="both">아이디 + 닉네임</option>
          </select>
        </div>
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            ref={input}
            type="text"
            id="keyword"
            onChange={changeHandler}
            required
          />
        </div>
      </div>
      <div className={styles.searchBtn}>
        <Button main={"sub"} text={"검색"} type={"submit"} />
      </div>
      <div className={styles.resetBtn}>
        <Button main={"sub"} onClick={reset} text={"초기화"} type={"button"} />
      </div>
    </form>
  );
}
