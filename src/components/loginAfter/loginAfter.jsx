import React, { useState } from 'react';
import styles from './loginAfter.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogOut } from '../../redux/actions/user_action';
import { emailLogOut } from '../../service/firebase/emailLogin';

const LoginAfter = () => {

    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch();

    const [isShow, setIsShow] = useState("none");
    const [diaryShow, setDiaryShow] = useState("none");

    const logOut = () => {
        emailLogOut();
        dispatch(userLogOut())
    }

    return (
        <div className={styles.loginUser}>
            <div className={styles.alert}>
              <FontAwesomeIcon icon={faBell} size="2x" color="#777"/>
            </div>
            <div 
              className={styles.menu}
              onMouseOver={()=>{setIsShow("block")}}
              onMouseOut={()=>{setIsShow("none")}}
            >
              <img
                className={styles.photoURL}
                src={currentUser.photoURL}
                alt="프로필사진"
              />
              <ul className={styles.submenu} style={{display:isShow}}>
                <li className={styles.profileList}>
                  <div className={styles.profile}>
                    <img src={currentUser.photoURL} alt={currentUser.displayName}/>
                    <div>
                      <span className={styles.name}>{currentUser.displayName}님</span>
                      <p>{currentUser.email}</p>
                    </div>
                  </div>
                  <div className={styles.btnGroup}>
                    <button className={styles.infoBtn}>정보수정</button>
                    <button className={styles.logOutBtn} onClick={logOut}>로그아웃</button>
                  </div>
                </li>
              </ul>
            </div>
            <div 
              className={styles.diaryWrap}
              onMouseOver={()=>{setDiaryShow("block")}}
              onMouseOut={()=>{setDiaryShow("none")}}
            >
              <div className={styles.diary}>
                <FontAwesomeIcon icon={faBars} size="2x" color="#fc8b79"/>
              </div>
              <ul className={styles.diarymenu} style={{display:diaryShow}}>
                  <Link to="/">
                    <li>나의 일기</li>
                  </Link>
                  <Link to="/createDiary">
                    <li>일기 추가</li>
                  </Link>
                  <li>이벤트</li>
                </ul>
            </div>
          </div>
    )
}

export default LoginAfter
