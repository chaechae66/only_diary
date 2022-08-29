import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { emailLogOut } from '../../service/firebase/emailLogin';
import { swalAlert } from '../../service/sweetAlert/alert';
import styles from './userMenu.module.css';
import basephotoURL from '../../asset/images/diary_default_img.png';
import { user_logout } from '../../store/userSlice';

const UserMenu = () => {

    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isShow, setIsShow] = useState("none");

    const logOut = (e) => {
        e.preventDefault();
        swalAlert('success','로그아웃 완료','로그아웃 되었습니다. 다음에 또 뵙겠습니다.');
        emailLogOut();
        dispatch(user_logout());
        navigate('/');
    }

    const userInfo = (e) => {
        e.preventDefault();
        swalAlert('info','안내','준비 중입니다. 좀 더 멋진 모습으로 뵙겠습니다.');
    }

    return (
        <div 
            className={styles.menu}
            onMouseOver={()=>{setIsShow("block")}}
            onMouseOut={()=>{setIsShow("none")}}
        >
            <img
            className={styles.photoURL}
            src={currentUser.photoURL || basephotoURL}
            alt="프로필사진"
            />
            <ul className={styles.submenu} style={{display:isShow}}>
            <li className={styles.profileList}>
                <div className={styles.profile}>
                <img src={currentUser.photoURL || basephotoURL} alt={currentUser.displayName}/>
                <div>
                    <span className={styles.name}>{currentUser.displayName}님</span>
                    <p>{currentUser.email}</p>
                </div>
                </div>
                <div className={styles.btnGroup}>
                <button className={styles.infoBtn} onClick={userInfo}>정보수정</button>
                <button className={styles.logOutBtn} onClick={logOut}>로그아웃</button>
                </div>
            </li>
            </ul>
        </div>
    )
}

export default UserMenu
