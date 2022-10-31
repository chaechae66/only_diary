import React, { useCallback, useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router";
import DiaryList from "../components/diaryList/diaryList";
import NoDiary from "../components/noDiary/noDiary";
import styles from "./styles/myDiary.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/service/firebase/emailLogin";
import { swalAlert } from "../lib/service/sweetAlert/alert";
import { useParams } from "react-router-dom";
import { RootState } from "../store";
import { getValues } from "../lib/service/firebase/database";
import { DiaryElem } from "../types/types";
import { PATH } from "../Routes/path";

const MyDiary = () => {
  const user = useSelector(
    (state: RootState) => state.user.currentUser,
    shallowEqual
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { uid } = useParams();
  const [diary, setDiary] = useState<DiaryElem[] | null>(null);

  const fetchDiarys = useCallback(async (): Promise<void> => {
    try {
      let diaryData: DiaryElem[] | [] = await getValues<DiaryElem>(
        "diary",
        user.uid
      );
      setDiary(diaryData);
    } catch (e) {
      console.log(e);
    }
  }, [user.uid]);

  useEffect(() => {
    !diary && fetchDiarys();
  }, [diary, fetchDiarys]);

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

export default MyDiary;
