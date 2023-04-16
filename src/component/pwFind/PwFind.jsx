import React, { useState } from "react";
import styles from "./PwFind.module.css";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router-dom";
import { findUserPw } from "../../api/user/findUser";

export default function FindForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ question: "dream" });
  const [userId, setUserId] = useState(null);
  const [warnning, setWarnning] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    findUserPw(user, setWarnning, setUserId);
  };
  const inspectString = (e) => {
    const input_type = e.target.id;
    const input_value = e.target.value;
    setUser((prev) => ({ ...prev, [input_type]: input_value }));
  };
  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler}>
        <div className={styles.content}>
          <div className={styles.title} onClick={() => navigate("/")}>
            비밀번호 찾기
          </div>
          <div className={styles.loginContent}>
            <div className={styles.inputs}>
              <input
                className={styles.loginInput}
                onChange={inspectString}
                type="text"
                id="userid"
                required
              />
              <label className={styles.label}>아이디</label>
              <span className={styles.span}></span>
            </div>
            <div className={styles.inputs}>
              <select
                className={styles.select}
                id="question"
                onChange={inspectString}
              >
                <option value="dream">어릴적 나의 꿈은?</option>
                <option value="father">아버지 성함은?</option>
                <option value="mather">어머니 성함은?</option>
              </select>
              <label className={styles.labelFind}>비번찾기 질문</label>
            </div>
            <div className={styles.inputs}>
              <input
                className={styles.loginInput}
                type="text"
                id="answer"
                onChange={inspectString}
                required
              />
              <label className={styles.label}>비번찾기 답변</label>
              <span className={styles.span}></span>
            </div>
            <div className={styles.findIt}>
              {userId && (
                <div>귀하의 비밀번호는 "{userId?.password}"입니다.</div>
              )}
            </div>

            {warnning && (
              <span className={styles.warnning}>
                아이디 또는 비밀번호 답변이 일치하지 않습니다.
              </span>
            )}
          </div>
          <div className={styles.btns}>
            <div className={styles.loginBtn}>
              <Button
                text={"돌아가기"}
                main={true}
                onClick={() => navigate("/")}
              />
            </div>
            <div className={styles.joinBtn}>
              <Button text={"비밀번호 검색"} main={false} type={"submit"} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
