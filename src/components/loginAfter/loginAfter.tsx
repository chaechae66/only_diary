import React from "react";
import styles from "./loginAfter.module.css";
import UserMenu from "../userMenu/userMenu";
import AlertMenu from "../alertMenu/alertMenu";
import DiaryMenu from "../diaryMenu/diaryMenu";

const LoginAfter = () => {
  return (
    <div className={styles.loginUser}>
      <AlertMenu />
      <UserMenu />
      <DiaryMenu />
    </div>
  );
};

export default LoginAfter;
