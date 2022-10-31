import React from "react";
import styles from "./styles/page404.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { PATH } from "../Routes/path";

const Page404 = () => {
  const navigate = useNavigate();

  const goToHome = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate(`${PATH.BASE}`);
  };

  const goToBack = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <section className={`bodyWrap ${styles.wrap}`}>
      <div className={styles.icon}>
        <FontAwesomeIcon
          icon={faExclamationCircle}
          color='rgb(250, 140, 107)'
          style={{
            width: "7rem",
            height: "7rem",
          }}
        />
        <span className={styles.iconTxt}>404</span>
      </div>
      <h2 className={styles.tit}>요청하신 페이지를 찾을 수 없습니다.</h2>
      <p className={styles.txt}>
        불편을 드려 죄송합니다.
        <br />
        요청하신 페이지를 찾을 수 없습니다. 확인 후 다시 시도해주세요.
      </p>
      <div className={styles.btnGroup}>
        <button className={styles.goToHomeBtn} onClick={goToHome}>
          홈으로 가기
        </button>
        <button onClick={goToBack}>뒤로 가기</button>
      </div>
    </section>
  );
};

export default Page404;
