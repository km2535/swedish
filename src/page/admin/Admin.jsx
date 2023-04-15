import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../component/navbar/Navbar";
import Footer from "../../component/footer/Footer";
import styles from "./Admin.module.css";
import { readBranch } from "../../api/branch/readBranch";

export default function Admin() {
  const navigate = useNavigate();
  const [branchList, setBranchList] = useState([]);
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   readBranch(setBranchList);
  // }, []);
  useEffect(() => {
    readBranch(setBranchList, setIsLoading);
    state && readBranch(setBranchList, setIsLoading);
  }, [state]);
  return (
    <div>
      <Navbar option={{ main: true, sub: false }} />
      <div className={styles.container}>
        <div className={styles.list}>
          <ul className={styles.ul}>
            <li className={styles.li} onClick={() => navigate("/admin")}>
              유저관리
            </li>
            <li className={styles.li} onClick={() => navigate("/admin/design")}>
              스킨변경
            </li>
            <li className={styles.li} onClick={() => navigate("/admin/branch")}>
              지점관리
            </li>
            <ul className={styles.subUl}>
              {isLoading && <></>}
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
            <li className={styles.li}>프로필매니저</li>
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
