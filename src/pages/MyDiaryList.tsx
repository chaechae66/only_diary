import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router";
import DiaryList from "../components/diaryPage/DiaryList/DiaryList";
import NoDiary from "../components/diaryPage/NoDiary/NoDiary";
import styles from "./styles/myDiary.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../service/firebase/emailLogin";
import { swalAlert } from "../service/sweetAlert/alert";
import { useParams } from "react-router-dom";
import { RootState } from "../store";
import { DiaryElem } from "../types/types";
import { PATH } from "../Routes/path";
import { useGetValues } from "../hook/useGetValues";

const MyDiaryList = () => {
  const user = useSelector(
    (state: RootState) => state.user.currentUser,
    shallowEqual
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { uid } = useParams();

  const diary = useGetValues<DiaryElem>("diary", user.uid);

  useEffect(() => {
    if (uid !== user.uid) {
      swalAlert("warning", "잘못된 접근", "올바른 접근이 아닙니다.");
      navigate(`${PATH.BASE}`);
    }
    return () => {
      setLoading(true);
    };
  }, [uid, navigate, user.uid]);

  useEffect(() => {
    onAuthStateChanged(auth, (onlyUser) => {
      if (!onlyUser) {
        navigate(`${PATH.LOGIN}`);
      } else {
        return;
      }
    });
  }, [user, navigate]);

  useEffect(() => {
    setLoading(true);
  }, [diary, loading]);

  return (
    <section className='bodyWrap'>
      {loading ? (
        <>
          <div className={styles.userInfo}>
            <img
              src={user?.photoURL}
              alt={user?.displayName}
              className={styles.userURL}
            />
            <h2 className={styles.nameGroup}>
              <span>{user?.displayName}님</span>
              <br />
              일기장
            </h2>
          </div>
          <div className={styles.diarys}>
            {diary?.length === 0 ? (
              <NoDiary />
            ) : (
              <DiaryList myDiary={true} diaryList={diary} />
            )}
          </div>
        </>
      ) : (
        <div>로딩중...</div>
      )}
    </section>
  );
};

export default MyDiaryList;
