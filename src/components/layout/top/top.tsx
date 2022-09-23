import React from 'react';
import styles from "./top.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LoginBefore from '../../loginBefore/loginBefore';
import LoginAfter from '../../loginAfter/loginAfter';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const Top = () => {
  const currentUser = useSelector((state : RootState ) => state.user.currentUser);

  return (
      <div className={styles.wrap}>
        <div className={styles.header}>
          <Link to="/">
            <h1 className={styles.logo}>
              <FontAwesomeIcon icon={faPaintBrush} size="sm" color="#fc8b79" />
              <div className={styles.logoTxt}>Only Diary</div>
            </h1>
          </Link>
          {
            currentUser?
            <LoginAfter />
            :
            <LoginBefore />
          }
        </div>
      </div>
  )
}

export default Top
