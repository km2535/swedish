import React, { useState } from "react";
import styles from "./FindForm.module.css";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router-dom";
import { check_phone_pattern } from "../../api/inspect/inspect";
import { findUser } from "../../api/user/findUser";

export default function FindForm() {
  const navigate = useNavigate();
  const [phoneInspect, setPhoneInspect] = useState(true);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(null);
  const [warnning, setWarnning] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    findUser(user, setWarnning, setUserId);
  };
  const inspectString = (e) => {
    const input_type = e.target.id;
    const input_value = e.target.value;
    setUser((prev) => ({ ...prev, [input_type]: input_value }));
    switch (input_type) {
      case "phone":
        setPhoneInspect(check_phone_pattern(input_value).valueOf());
        break;

      default:
        break;
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler}>
        <div className={styles.content}>
          <div className={styles.title} onClick={() => navigate("/")}>
            아이디 찾기
          </div>
          <div className={styles.loginContent}>
            <div className={styles.inputs}>
              <input
                className={styles.loginInput}
                onChange={inspectString}
                type="text"
                id="phone"
                required
              />
              <label className={styles.label}>
                휴대전화<span>(-)포함</span>
              </label>
              <span className={styles.span}></span>
            </div>
            <div className={styles.findIt}>
              {userId && <div>귀하의 아이디는 "{userId?.userid}"입니다.</div>}
            </div>
            {phoneInspect || (
              <span className={styles.warnning}>
                휴대전화 양식을 확인하세요.
              </span>
            )}
            {warnning && (
              <span className={styles.warnning}>
                아이디가 존재하지 않습니다.
              </span>
            )}
          </div>
          <div className={styles.btns}>
            <div className={styles.loginBtn}>
              <Button
                text={"돌아가기"}
                main={true}
                fontsize={20}
                onClick={() => navigate("/")}
              />
            </div>
            <div className={styles.joinBtn}>
              <Button
                text={"아이디 검색"}
                main={false}
                fontsize={20}
                type={"submit"}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
