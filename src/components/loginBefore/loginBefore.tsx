import React from 'react';
import styles from './loginBefore.module.css';
import { Link } from "react-router-dom";

const LoginBefore = () => {
    return (
        <div className={styles.user}>
            <Link to="signup">
              <span className={styles.signIn}>
                회원가입
              </span>
            </Link>
            <Link to="login">
              <span className={styles.login}>
                로그인
              </span>
            </Link>
          </div>
    )
}

export default LoginBefore
