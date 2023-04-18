import React, { useState } from "react";
import styles from "./JoinForm.module.css";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router-dom";
import {
  check_id_pattern,
  check_phone_pattern,
  check_pw_pattern,
} from "../../api/inspect/inspect";
import { chk_user_id, chk_user_nickname } from "../../api/inspect/chkuser";
import { joinUser } from "../../api/user/joinUser";

export default function JoinForm() {
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const [pwchk, setPwchk] = useState("");
  const [idInspect, setIdInspect] = useState(true);
  const [duplication, setDuplication] = useState(true);
  const [duplinickname, setDuplinickname] = useState(true);
  const [pwInspect, setPwInspect] = useState(true);
  const [pwchkInspect, setPwchkInspect] = useState(true);
  const [phoneInspect, setPhoneInspect] = useState(true);
  const [user, setUser] = useState({ question: "dream" });
  const submitHandler = (e) => {
    e.preventDefault();
    //회원가입 로직
    if (pw !== pwchk) {
      window.alert("비밀번호를 다시 확인해주세요.");
    } else if (
      !(
        idInspect &&
        pwInspect &&
        pwchkInspect &&
        phoneInspect &&
        duplication &&
        duplinickname
      )
    ) {
      window.alert("모든 요소를 정확히 입력해주세요.");
    } else {
      joinUser(user).then(() => {
        window.alert("가입을 요청합니다. 관리자를 통해 승인받으세요.");
        navigate("/");
      });
    }
  };
  const inspectString = (e) => {
    const input_type = e.target.id;
    const input_value = e.target.value;
    setUser((prev) => ({ ...prev, [input_type]: input_value }));
    switch (input_type) {
      case "userid":
        chk_user_id(input_value, setDuplication);
        setIdInspect(check_id_pattern(input_value).valueOf());
        break;
      case "password":
        setPwInspect(check_pw_pattern(input_value).valueOf());
        setPw(input_value);
        break;
      case "passChk":
        setPwchkInspect(pw === input_value);
        setPwchk(input_value);
        break;
      case "phone":
        setPhoneInspect(check_phone_pattern(input_value).valueOf());
        break;
      case "nickname":
        chk_user_nickname(input_value, setDuplinickname);
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
            회원가입
          </div>
          <div className={styles.loginContent}>
            <div className={styles.inputs}>
              <input
                className={styles.loginInput}
                onChange={inspectString}
                type="text"
                id="nickname"
                required
              />
              <label className={styles.label}>
                닉네임
                {duplinickname || (
                  <span className={styles.warnSide}>중복된 닉네임입니다.</span>
                )}
              </label>
              <span className={styles.span}></span>
            </div>
            <div className={styles.inputs}>
              <input
                className={styles.loginInput}
                type="text"
                id="userid"
                onChange={inspectString}
                required
              />
              <label className={styles.label}>
                아이디
                {duplication || (
                  <span className={styles.warnSide}>중복된 아이디입니다.</span>
                )}
              </label>
              <span className={styles.span}></span>
            </div>
            {idInspect || (
              <span className={styles.warnning}>
                영문자로 시작하는 영문자 또는 숫자 6~20자 입력
              </span>
            )}

            <div className={styles.inputs}>
              <input
                className={styles.loginInput}
                type="password"
                id="password"
                onChange={inspectString}
                required
              />
              <label className={styles.label}>비밀번호</label>
              <span className={styles.span}></span>
            </div>
            {pwInspect || (
              <span className={styles.warnning}>
                최소 8 자, 최소 하나의 문자 및 하나의 숫자 입력
              </span>
            )}
            <div className={styles.inputs}>
              <input
                className={styles.loginInput}
                onChange={inspectString}
                type="password"
                id="passChk"
                required
              />
              <label className={styles.label}>비밀번호 확인</label>
              <span className={styles.span}></span>
            </div>
            {pwchkInspect || (
              <span className={styles.warnning}>
                비밀번호가 일치하지 않습니다.
              </span>
            )}
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
            <div className={styles.inputs}>
              <input
                className={styles.loginInput}
                onChange={inspectString}
                type="text"
                id="phone"
                required
              />
              <label className={styles.label}>휴대전화</label>
              <span className={styles.span}></span>
            </div>
            {phoneInspect || (
              <span className={styles.warnning}>
                휴대전화 양식을 확인하세요.
              </span>
            )}
          </div>
          <span className={styles.warnning}>
            업소이력 없으면 가입불가입니다.
          </span>
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
                text={"회원가입"}
                main={false}
                fontsize={20}
                type={"submit"}
              />
            </div>
          </div>
          {/* <div className={styles.description}>
            * 회원가입 문의{" "}
            <a href={`tel:${process.env.REACT_APP_API_PHONE}`}>
              {process.env.REACT_APP_API_PHONE}
            </a>
          </div> */}
        </div>
      </form>
    </div>
  );
}
