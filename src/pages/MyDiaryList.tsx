import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router";
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
import DiaryCard from "../components/diaryPage/DiaryCard/DiaryCard";

const MyDiaryList = () => {
  const user = useSelector(
    (state: RootState) => state.user.currentUser,
    shallowEqual
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { uid } = useParams();

  const diaryList = useGetValues<DiaryElem>("diary", user.user_seqno);

  useEffect(() => {
    if (uid !== user.user_seqno) {
      swalAlert("warning", "잘못된 접근", "올바른 접근이 아닙니다.");
      navigate(`${PATH.BASE}`);
    }
    return () => {
      setLoading(true);
    };
  }, [uid, navigate, user.user_seqno]);

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
  }, [diaryList, loading]);

  return (
    <section className='bodyWrap'>
      {loading ? (
        <>
          <div className={styles.userInfo}>
            <img
              src={user?.photoURL}
              alt={user?.name}
              className={styles.userURL}
            />
            <h2 className={styles.nameGroup}>
              <span>{user?.name}님</span>
              <br />
              일기장
            </h2>
          </div>
          <div className={styles.diarys}>
            {diaryList?.length === 0 ? (
              <NoDiary />
            ) : (
              <ul className={styles.diaryList}>
              {diaryList?.map(diary =>{
                    return <DiaryCard isPrivateDiary={false} key={diary.id} diary={diary} />
                })}
            </ul>
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
