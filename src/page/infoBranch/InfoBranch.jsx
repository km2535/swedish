import React, { useEffect, useState } from "react";
import Navbar from "../../component/navbar/Navbar";
import { useAuthContext } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { readBranch } from "../../api/branch/readBranch";
import BranchCard from "../../component/branch/BranchCard";
import styles from "./InfoBranch.module.css";
import LoadingSpinner from "../../component/loadingSpinner/LoadingSpinner";

export default function InfoBranch() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [branchList, setBranchList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user === null || user.approve === "false") {
      navigate("/");
    }
  }, [navigate, user]);

  useEffect(() => {
    readBranch(setBranchList, setIsLoading);
  }, []);
  return (
    <div>
      <Navbar option={{ main: true, sub: false }} />
      <div className={styles.intro}>
        <div className={styles.title}>지점안내</div>
      </div>
      <div className={styles.container}>
        {isLoading && <LoadingSpinner />}
        {branchList.map((branch) => (
          <div className={styles.card} key={branch.ID}>
            <BranchCard branch={branch} />
          </div>
        ))}
      </div>
    </div>
  );
}
