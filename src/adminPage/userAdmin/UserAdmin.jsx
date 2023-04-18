import React, { useEffect, useState } from "react";
import { user_list } from "../../api/user/userList";
import UserList from "./userList/UserList";
import styles from "./UserAdmin.module.css";
import LoadingSpinner from "../../component/loadingSpinner/LoadingSpinner";

export default function UserAdmin() {
  //유저관리
  const [noneApproveList, setNoneApproveList] = useState([]);
  const [approveList, setApproveList] = useState([]);
  const [adminList, setAdminList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin] = useState(true);

  useEffect(() => {
    user_list(setNoneApproveList, setApproveList, setAdminList, setIsLoading);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.mainTitle}>신규가입 유저관리</div>
      <div className={styles.table}>
        <div className={styles.title}>관리자 목록</div>
        <div className={styles.content}>
          {isLoading && <LoadingSpinner />}
          <UserList
            isAdmin={isAdmin}
            userList={adminList}
            setNoneApproveList={setNoneApproveList}
            setApproveList={setApproveList}
            setAdminList={setAdminList}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.title}>승인유저</div>
        <div className={styles.content}>
          {isLoading && <LoadingSpinner />}
          <UserList
            userList={approveList}
            setNoneApproveList={setNoneApproveList}
            setApproveList={setApproveList}
            setAdminList={setAdminList}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.title}>승인대기</div>
        <div className={styles.content}>
          {isLoading && <LoadingSpinner />}
          <UserList
            isBlockUser={true}
            userList={noneApproveList}
            setNoneApproveList={setNoneApproveList}
            setApproveList={setApproveList}
            setAdminList={setAdminList}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
    </div>
  );
}
