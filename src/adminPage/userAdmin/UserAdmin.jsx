import React, { useEffect, useState } from "react";
import { user_list } from "../../api/user/userList";
import UserList from "./userList/UserList";
import styles from "./UserAdmin.module.css";
import LoadingSpinner from "../../component/loadingSpinner/LoadingSpinner";

export default function UserAdmin() {
  //관리자 목록
  const [adminList, setAdminList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCnt, setTotalCnt] = useState(0);
  const [isAdmin] = useState(true);

  useEffect(() => {
    user_list(setAdminList, setIsLoading, setTotalCnt);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.mainTitle}>관리자</div>
      <div className={styles.table}>
        <div className={styles.content}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <UserList
              isAdmin={isAdmin}
              totalCnt={totalCnt}
              setTotalCnt={setTotalCnt}
              adminList={adminList}
              setAdminList={setAdminList}
              setIsLoading={setIsLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
