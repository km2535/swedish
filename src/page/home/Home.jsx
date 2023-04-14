import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../component/footer/Footer";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div>
      <div className={styles.viewHeigth}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
