import React from "react";
import styles from "./Button.module.css";

export default function Button({
  main,
  text,
  onClick,
  fontsize,
  isLoading,
  type,
  id,
}) {
  return (
    <button
      style={{ fontSize: `${fontsize}px` }}
      className={main ? styles.btnBlack : styles.btnGray}
      onClick={onClick}
      type={type}
      id={id}
    >
      {isLoading ? <div className={styles.loader}></div> : text}
    </button>
  );
}
