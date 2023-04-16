import React from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../../../component/ui/button/Button";
import { user_update } from "../../../api/user/updateUser";
import { user_list } from "../../../api/user/userList";
import { delete_user } from "../../../api/user/deleteUser";
import styles from "./UserList.module.css";

export default function UserList({
  userList,
  setNoneApproveList,
  setApproveList,
  setAdminList,
  isBlockUser,
  setIsLoading,
}) {
  const approveAdmin = (e) => {
    const newUser = { userid: e.target.id, approve: "true", isAdmin: "true" };
    if (window.confirm("해당 유저를 승인하시겠습니까?")) {
      user_update(newUser).then(() => {
        user_list(
          setNoneApproveList,
          setApproveList,
          setAdminList,
          setIsLoading
        );
      });
    }
  };
  const approveAdminCancle = (e) => {
    const newUser = { userid: e.target.id, approve: "true", isAdmin: "false" };
    if (window.confirm("해당 유저를 비승인하시겠습니까?")) {
      user_update(newUser).then(() => {
        user_list(
          setNoneApproveList,
          setApproveList,
          setAdminList,
          setIsLoading
        );
      });
    }
  };
  const approveCancle = (e) => {
    const newUser = { userid: e.target.id, approve: "false", isAdmin: "false" };
    if (window.confirm("해당 유저를 비승인하시겠습니까?")) {
      user_update(newUser).then(() => {
        user_list(
          setNoneApproveList,
          setApproveList,
          setAdminList,
          setIsLoading
        );
      });
    }
  };
  const approve = (e) => {
    const newUser = { userid: e.target.id, approve: "true", isAdmin: "false" };
    if (window.confirm("해당 유저를 승인하시겠습니까?")) {
      user_update(newUser).then(() => {
        user_list(
          setNoneApproveList,
          setApproveList,
          setAdminList,
          setIsLoading
        );
      });
    }
  };
  const deleteUser = (e) => {
    const newUser = { userid: e.target.id };
    if (window.confirm("해당 유저를 삭제하시겠습니까?")) {
      delete_user(newUser).then(() => {
        user_list(
          setNoneApproveList,
          setApproveList,
          setAdminList,
          setIsLoading
        );
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
          <th className={styles.th}>{isBlockUser ? "유저삭제" : "관리자"}</th>
        </tr>
      </thead>
      <tbody>
        {userList.length === 0 && (
          <tr>
            <td colSpan={5}>유저가 없습니다.</td>
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
            <td className={styles.phone}>{user?.phone}</td>
            <td className={styles.btns}>
              {user?.approve === "true" ? (
                <div className={styles.btn}>
                  <Button
                    text={"취소"}
                    main={"sub"}
                    onClick={approveCancle}
                    id={user?.userid}
                    // fontsize={18}
                  />
                </div>
              ) : (
                <div className={styles.btn}>
                  <Button
                    text={"승인"}
                    onClick={approve}
                    id={user?.userid}
                    // fontsize={18}
                  />
                </div>
              )}
            </td>
            <td className={styles.btn}>
              {user?.isAdmin === "true" ? (
                <div className={styles.btn}>
                  <Button
                    text={"취소"}
                    main={"sub"}
                    onClick={approveAdminCancle}
                    id={user?.userid}
                    // fontsize={18}
                  />
                </div>
              ) : isBlockUser ? (
                <div className={styles.btn}>
                  <Button
                    text={"삭제"}
                    main={"sub"}
                    onClick={deleteUser}
                    // fontsize={18}
                    id={user?.userid}
                  />
                </div>
              ) : (
                <div className={styles.btn}>
                  <Button
                    text={"지정"}
                    // fontsize={18}
                    onClick={approveAdmin}
                    id={user?.userid}
                  />
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
