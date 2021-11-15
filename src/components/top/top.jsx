import React, { useEffect } from 'react';
import styles from "./top.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LoginBefore from '../loginBefore/loginBefore';
import LoginAfter from '../loginAfter/loginAfter';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../service/firebase/emailLogin';
import { useDispatch } from 'react-redux';
import { userLogIn } from '../../redux/actions/user_action'
import { useSelector } from 'react-redux';

const Top = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(userLogIn(user));
      } else {
        return;
      }
    });
  }, [currentUser,dispatch]);

  return (
      <div className={styles.wrap}>
      <header className={styles.header}>
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
      </header>
    </div>
  )
}

export default Top
