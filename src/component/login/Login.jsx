import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../ui/button/Button";
import { useAuthContext } from "../../context/AuthContextProvider";
import { login_user } from "../../api/user/loginUser";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const [log, setLog] = useState({});
  const [warnning, setWarnning] = useState(false);
  const [stay, setStay] = useState(false);

  const changeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.id;
    setLog((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    login_user(log, setUser, setWarnning, setStay);
  };
  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <div className={styles.content}>
        <div className={styles.title} onClick={() => navigate("/")}>
          로그인
        </div>
        <div className={styles.loginContent}>
          <div className={styles.inputs}>
            <input
              className={styles.loginInput}
              type="text"
              id="userid"
              onChange={changeHandler}
              required
            />
            <label className={styles.label}>아이디</label>
            <span className={styles.span}></span>
          </div>
          <div className={styles.inputs}>
            <input
              className={styles.loginInput}
              type="password"
              id="password"
              onChange={changeHandler}
              required
            />
            <label className={styles.label}>비밀번호</label>
            <span className={styles.span}></span>
          </div>
        </div>
        <div className={styles.warnning}>
          {warnning && (
            <span className={styles.warnning}>
              아이디 또는 비밀번호를 확인하세요.
            </span>
          )}
          {stay && (
            <span className={styles.warnning}>관리자 승인대기 중 입니다.</span>
          )}
        </div>
        <div className={styles.findCotent}>
          <div className={styles.idFind} onClick={() => navigate("/idFind")}>
            아이디 찾기
          </div>
          <div className={styles.pwFind} onClick={() => navigate("/pwFind")}>
            비밀번호 찾기
          </div>
        </div>
        <div className={styles.btns}>
          <div className={styles.loginBtn}>
            <Button text={"로그인"} main={true} fontsize={20} type={"submit"} />
          </div>
          <div className={styles.joinBtn}>
            <Button
              text={"회원가입"}
              main={false}
              fontsize={20}
              onClick={() => navigate("/join")}
            />
          </div>
        </div>
        <div className={styles.description}>
          * 회원이 아니시라면 회원가입을 먼저 해주세요.
        </div>
      </div>
    </form>
  );
}
