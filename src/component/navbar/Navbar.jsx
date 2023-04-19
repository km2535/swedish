import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuthContext } from "../../context/AuthContextProvider";
import { logout } from "../../api/user/logout";

export default function Navbar({
  option,
  boardId,
  boardName,
  boardPhone,
  boardAddress,
  boardlocation,
}) {
  const { main, sub } = option;
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const [id] = useState(boardId);
  const [branchName] = useState(boardName);
  const [branchPhone] = useState(boardPhone);
  const [branchLocation] = useState({ boardAddress, boardlocation, boardId });
  const logoutHandler = () => {
    logout(setUser);
  };
  return (
    <>
      <div className={styles.container} id="naviContainer">
        {main && (
          <>
            <div className={styles.logo}>
              <div
                className={styles.logoContainer}
                onClick={() => navigate("/")}
              >
                인천스웨디시
              </div>
            </div>
            <div className={styles.userinfo}>
              <div className={styles.manager}>
                {user?.isAdmin === "true" && (
                  <span
                    className={styles.txt}
                    onClick={() => navigate("/admin")}
                  >
                    관리자페이지
                  </span>
                )}
              </div>
              <div className={styles.manager}>
                {user && (
                  <span className={styles.txt} onClick={logoutHandler}>
                    로그아웃
                  </span>
                )}
              </div>
            </div>
          </>
        )}
        {sub && (
          <>
            <div className={styles.subLogo}>
              <div
                className={styles.logoContainer}
                onClick={() => navigate("/")}
              >
                인천스웨디시
              </div>
            </div>
            <div className={styles.navbar}>
              <li
                id="option1"
                className={styles.option1}
                onClick={() => navigate(`/swedish/${id}`, { state: id })}
              >
                출근부
              </li>
              <li
                id="option2"
                className={styles.option2}
                onClick={() => navigate("manager", { state: id })}
              >
                매니저프로필
              </li>
              <li
                id="option3"
                className={styles.option3}
                onClick={() => navigate("review", { state: id })}
              >
                후기게시판
              </li>
              <li
                id="option4"
                className={styles.option4}
                onClick={() => navigate("notice")}
              >
                공지사항
              </li>
              <li
                id="option5"
                className={styles.option5}
                onClick={() => navigate("location", { state: branchLocation })}
              >
                오시는길
              </li>
            </div>
            <div className={styles.usersubinfo}>
              <div className={styles.manager}>
                {user?.isAdmin === "true" && (
                  <span
                    className={styles.txt}
                    onClick={() => navigate("/admin")}
                  >
                    관리자페이지
                  </span>
                )}
              </div>
              <div className={styles.manager}>
                {user && (
                  <span className={styles.txt} onClick={logoutHandler}>
                    로그아웃
                  </span>
                )}
              </div>
            </div>
          </>
        )}
        {/* <div className={sub ? styles.logginDark : styles.loggin}></div> */}
      </div>
      {sub && (
        <div className={styles.branchName}>
          {branchName}{" "}
          <a className={styles.phoneContact} href={`tel:${branchPhone}`}>
            ({branchPhone})
          </a>
        </div>
      )}
    </>
  );
}
