import React from "react";
import styles from "./Top.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LoginBefore from "../../intro/menu/loginBefore/loginBefore";
import LoginAfter from "../../intro/menu/loginAfter/loginAfter";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { PATH } from "../../../Routes/path";

const Top = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return (
    <header className={styles.wrap}>
      <div className={styles.header}>
        <Link to={`${PATH.BASE}`}>
          <h1 className={styles.logo}>
            <FontAwesomeIcon icon={faPaintBrush} size='sm' color='#fc8b79' />
            <div className={styles.logoTxt}>Only Diary</div>
          </h1>
        </Link>
        {currentUser ? <LoginAfter /> : <LoginBefore />}
      </div>
    </header>
  );
};

export default Top;
