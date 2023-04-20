import React from "react";
import styles from "./UserLists.module.css";
import { v4 as uuidv4 } from "uuid";
import Button from "../../../component/ui/button/Button";
import { user_update } from "../../../api/user/updateUser";
import { delete_user } from "../../../api/user/deleteUser";
import {
  approveUserList,
  noneApproveUserList,
} from "../../../api/user/userList";

export default function UserLists({
  userList,
  setIsLoading,
  setUserList,
  currentPage,
  isNoneApprove,
}) {
  const approveCancle = (e) => {
    const newUser = { userid: e.target.id, approve: "false", isAdmin: "false" };
    const startPage = (currentPage - 1) * 10;
    const endPage = 10;
    if (window.confirm("해당 유저를 비승인하시겠습니까?")) {
      user_update(newUser).then(() => {
        approveUserList(startPage, endPage, setUserList, setIsLoading);
      });
    }
  };
  const approveAdmin = (e) => {
    const newUser = { userid: e.target.id, approve: "true", isAdmin: "true" };
    const startPage = (currentPage - 1) * 10;
    const endPage = 10;
    if (window.confirm("해당 유저를 관리자로 승인하시겠습니까?")) {
      user_update(newUser).then(() => {
        approveUserList(startPage, endPage, setUserList, setIsLoading);
      });
    }
  };
  const deleteUser = (e) => {
    const newUser = { userid: e.target.id };
    const startPage = (currentPage - 1) * 10;
    const endPage = 10;
    if (window.confirm("해당 유저를 삭제하시겠습니까?")) {
      delete_user(newUser).then(() => {
        noneApproveUserList(startPage, endPage, setUserList, setIsLoading);
      });
    }
  };
  const approve = (e) => {
    const newUser = { userid: e.target.id, approve: "true", isAdmin: "false" };
    const startPage = (currentPage - 1) * 10;
    const endPage = 10;
    if (window.confirm("해당 유저를 승인하시겠습니까?")) {
      user_update(newUser).then(() => {
        noneApproveUserList(startPage, endPage, setUserList, setIsLoading);
      });
    }
  };
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.header}>
          <th className={styles.th}>유저아이디</th>
          <th className={styles.th}>닉네임</th>
          <th className={styles.th}>전화번호</th>
          <th className={styles.th}>접근승인</th>
          <th className={styles.th}>{isNoneApprove ? "유저삭제" : "관리자"}</th>
        </tr>
      </thead>
      <tbody>
        {userList.length === 0 && (
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
        {userList.map((user) => (
          <tr key={uuidv4()} className={styles.tr}>
            <td className={styles.userid}>{user?.userid}</td>
            <td className={styles.nickname}>{user?.nickname}</td>
            <td className={styles.phone}>
              <a href={`tel:${user?.phone}`}>{user?.phone}</a>
            </td>
            {isNoneApprove ? (
              <>
                <td className={styles.btns}>
                  <div className={styles.btn}>
                    <Button text={"승인"} onClick={approve} id={user?.userid} />
                  </div>
                </td>
                <td className={styles.btn}>
                  <div className={styles.btn}>
                    <Button
                      text={"삭제"}
                      main={"sub"}
                      onClick={deleteUser}
                      id={user?.userid}
                    />
                  </div>
                </td>
              </>
            ) : (
              <>
                <td className={styles.btns}>
                  <div className={styles.btn}>
                    <Button
                      text={"취소"}
                      main={"sub"}
                      onClick={approveCancle}
                      id={user?.userid}
                    />
                  </div>
                </td>
                <td className={styles.btn}>
                  <div className={styles.btn}>
                    <Button
                      text={"지정"}
                      onClick={approveAdmin}
                      id={user?.userid}
                    />
                  </div>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
