import React, { useEffect, useState } from "react";
import Navbar from "../../component/navbar/Navbar";
import { useAuthContext } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { readBranch } from "../../api/branch/readBranch";
import BranchCard from "../../component/branch/BranchCard";
import styles from "./InfoBranch.module.css";

export default function InfoBranch() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [branchList, setBranchList] = useState([]);

  useEffect(() => {
    if (user === null || user.approve === "false") {
      navigate("/");
    }
  }, [navigate, user]);

  useEffect(() => {
    readBranch(setBranchList);
  }, []);
  return (
    <div>
      <Navbar option={{ main: true, sub: false }} />
      <div className={styles.container}>
        {branchList.map((branch) => (
          <div className={styles.card} key={branch.ID}>
            <BranchCard branch={branch} />
          </div>
        ))}
      </div>
    </div>
  );
}
