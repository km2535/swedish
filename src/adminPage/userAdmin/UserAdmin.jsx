import React, { useEffect, useState } from "react";
import { user_list } from "../../api/user/userList";
import UserList from "./userList/UserList";
import styles from "./UserAdmin.module.css";

export default function UserAdmin() {
  //유저관리
  const [noneApproveList, setNoneApproveList] = useState([]);
  const [approveList, setApproveList] = useState([]);
  const [adminList, setAdminList] = useState([]);

  useEffect(() => {
    user_list(setNoneApproveList, setApproveList, setAdminList);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.mainTitle}>유저관리</div>
      <div className={styles.table}>
        <div className={styles.title}>관리자 목록</div>
        <div className={styles.content}>
          <UserList
            userList={adminList}
            setNoneApproveList={setNoneApproveList}
            setApproveList={setApproveList}
            setAdminList={setAdminList}
          />
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.title}>승인유저</div>
        <div className={styles.content}>
          <UserList
            userList={approveList}
            setNoneApproveList={setNoneApproveList}
            setApproveList={setApproveList}
            setAdminList={setAdminList}
          />
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.title}>승인대기</div>
        <div className={styles.content}>
          <UserList
            isBlockUser={true}
            userList={noneApproveList}
            setNoneApproveList={setNoneApproveList}
            setApproveList={setApproveList}
            setAdminList={setAdminList}
          />
        </div>
      </div>
    </div>
  );
}
