import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { userLogOut } from '../../redux/actions/user_action';
import { emailLogOut } from '../../service/firebase/emailLogin';
import { swalAlert } from '../../service/sweetAlert/alret';
import styles from './userMenu.module.css';
import basephotoURL from '../../images/diary_default_img.png';

const UserMenu = () => {

    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const history = useHistory();

    const [isShow, setIsShow] = useState("none");

    const logOut = () => {
        swalAlert('success','로그아웃 완료','로그아웃 되었습니다. 다음에 또 뵙겠습니다.');
        emailLogOut();
        dispatch(userLogOut());
        history.push('/');
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
                <button className={styles.infoBtn}>정보수정</button>
                <button className={styles.logOutBtn} onClick={logOut}>로그아웃</button>
                </div>
            </li>
            </ul>
        </div>
    )
}

export default UserMenu
