import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { auth, updateProfile } from "../../lib/service/firebase/emailLogin";
import { swalAlert } from "../../lib/service/sweetAlert/alert";
import styles from "./userMenu.module.css";
import basephotoURL from "../../asset/images/diary_default_img.png";
import { update_photo, user_logout } from "../../store/userSlice";
import { v4 } from "uuid";
import { getOtherImgUrl } from "../../lib/service/firebase/storage";
import { saveDB } from "../../lib/service/firebase/database";
import { RootState } from "../../store";
import { PATH } from "../../Routes/path";

const UserMenu = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputFileRef = useRef(null);

  const [isShow, setIsShow] = useState("none");

  const logOut = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    swalAlert(
      "success",
      "로그아웃 완료",
      "로그아웃 되었습니다. 다음에 또 뵙겠습니다."
    );
    auth.signOut();
    dispatch(user_logout());
    navigate(`${PATH.BASE}`);
  };

  const userInfo = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    inputFileRef.current.click();
  };

  const updateImg = async (_file: File, _type: string) => {
    let filePath = `photoURL/${currentUser.uid}/${v4()}.${_type}`;
    const url = await getOtherImgUrl(filePath, _file);
    return url;
  };

  const changeImg = async (e: React.ChangeEvent<HTMLElement>) => {
    e.preventDefault();
    const file = (e.target as HTMLInputElement).files[0];
    let fileType = file.type.slice(6);
    const url = await updateImg(file, fileType);
    await updateProfile(auth.currentUser, {
      photoURL: url,
    });
    dispatch(update_photo(url));
    await saveDB(`users/${currentUser.uid}/photoURL`, url);
  };

  return (
    <div
      className={styles.menu}
      onMouseOver={() => {
        setIsShow("block");
      }}
      onMouseOut={() => {
        setIsShow("none");
      }}
    >
      <img
        className={styles.photoURL}
        src={currentUser.photoURL || basephotoURL}
        alt='프로필사진'
      />
      <input
        ref={inputFileRef}
        type='file'
        accept='image/jpeg, image/png'
        style={{ display: "none" }}
        onChange={changeImg}
      />
      <ul className={styles.submenu} style={{ display: isShow }}>
        <li className={styles.profileList}>
          <div className={styles.profile}>
            <img
              src={currentUser.photoURL || basephotoURL}
              alt={currentUser.displayName}
            />
            <div>
              <span className={styles.name}>{currentUser.displayName}님</span>
              <p>{currentUser.email}</p>
            </div>
          </div>
          <div className={styles.btnGroup}>
            <button className={styles.infoBtn} onClick={userInfo}>
              프로필수정
            </button>
            <button className={styles.logOutBtn} onClick={logOut}>
              로그아웃
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
