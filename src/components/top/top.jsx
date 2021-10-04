import React from 'react';
import styles from "./top.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Top = () => {
  return (
      <div className={styles.wrap}>
      <header className={styles.header}>
        <Link to="/">
          <h1 className={styles.logo}>
            <FontAwesomeIcon icon={faPaintBrush} size="sm" color="#fc8b79" />
            <div className={styles.logoTxt}>Only Diary</div>
          </h1>
        </Link>
          <div className={styles.user}>
            <Link to="/signUp">
              <span className={styles.signIn}>
                회원가입
              </span>
            </Link>
            <Link to="/login">
              <span className={styles.login}>
                로그인
              </span>
            </Link>
          </div>
      </header>
    </div>
  )
}

export default Top
