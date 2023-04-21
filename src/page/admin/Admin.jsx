import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../component/navbar/Navbar";
import Footer from "../../component/footer/Footer";
import styles from "./Admin.module.css";
import { readBranchNoRandom } from "../../api/branch/readBranch";
import { BsFillTriangleFill } from "react-icons/bs";
export default function Admin() {
  const navigate = useNavigate();
  const [branchList, setBranchList] = useState([]);
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   readBranch(setBranchList);
  // }, []);
  useEffect(() => {
    readBranchNoRandom(setBranchList, setIsLoading);
    state && readBranchNoRandom(setBranchList, setIsLoading);
  }, [state]);
  return (
    <div>
      <Navbar option={{ main: true, sub: false }} />
      <div className={styles.container}>
        <div className={styles.list}>
          <ul className={styles.ul}>
            <li className={styles.li} onClick={() => navigate("/admin")}>
              관리자
            </li>
            <li
              className={styles.li}
              onClick={() => navigate("/admin/userList")}
            >
              신규가입
            </li>
            <li className={styles.li} onClick={() => navigate("/admin/design")}>
              스킨변경
            </li>
            <li className={styles.li} onClick={() => navigate("/admin/branch")}>
              지점관리
            </li>
            <ul className={styles.subUl}>
              {branchList.map((branch) => (
                <li
                  className={styles.subLi}
                  key={branch?.ID}
                  onClick={() =>
                    navigate("/admin/branchDetail", { state: branch })
                  }
                >
                  {branch?.TITLE}
                </li>
              ))}
            </ul>
            <li className={styles.li} onClick={() => navigate("/admin/notice")}>
              공지사항
            </li>
          </ul>
        </div>
        <div className={styles.mbUl}>
          <ul className={styles.mbsubUl}>
            {isLoading && <></>}
            {branchList.length > 0 && (
              <div className={styles.arrow}>
                <BsFillTriangleFill />
              </div>
            )}
            {branchList.map((branch) => (
              <li
                className={styles.subLi}
                key={branch?.ID}
                onClick={() =>
                  navigate("/admin/branchDetail", { state: branch })
                }
              >
                {branch?.TITLE}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.contents}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
