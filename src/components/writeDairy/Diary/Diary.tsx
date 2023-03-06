import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShowImage from "../ShowImage/ShowImage";
import ShowDate from "../ShowDate/ShowDate";
import Txt from "../Txt/Txt";
import styles from "./Diary.module.css";
import { useNavigate } from "react-router";
import Likey from "../Likey/Likey";
import { swalAlert } from "../../../service/sweetAlert/alert";
import { removeDB } from "../../../service/firebase/database";
import { DiaryElem } from "../../../types/types";
import { RootState } from "../../../store";
import { PATH } from "../../../Routes/path";

const Diary = ({ diary }: { diary: DiaryElem }) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const goToBack = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  const goToUpdate = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate(`${PATH.UPDATE}/${diary.id}`, {
      state: {
        diary: diary,
      },
    });
  };

  // const alertBtn = async (e: React.MouseEvent<HTMLElement>) => {
  //   e.preventDefault();
  //   if (diary.isprivate) {
  //     await removeDB(`diary/${currentUser.uid}/${diary.id}`);
  //     navigate(`/${currentUser.uid}`);
  //   } else {
  //     await removeDB(`diary/${currentUser.uid}/${diary.id}`);
  //     await removeDB(`public/${diary.id}`);
  //     navigate("/");
  //   }
  //   swalAlert("success", "삭제완료", "다이어리 삭제가 완료되었습니다.");
  // };

  useEffect(() => {
    diary && setLoading(true);
  }, [diary]);

  return (
    <section className={styles.wrap}>
      {loading ? (
        <>
          <div className={styles.userWrap}>
            <span className={styles.user}>
              {diary?.createUser.name}님의 일기
            </span>
            {currentUser ? (
              currentUser.user_seqno === diary?.createUser.uid ? (
                <div className={styles.btnGroup}>
                  <button className={styles.editBtn} onClick={goToUpdate}>
                    수정
                  </button>
                  <button 
                    className={styles.delBtn} 
                    // onClick={alertBtn}
                  >
                    삭제
                  </button>
                </div>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </div>
          <ShowImage baseUrl={diary?.img} />
          <div className={styles.option}>
            <div className={styles.optionInfo}>
              <ShowDate date={diary?.date} />
              <span className={styles.isPrivate}>
                {!diary?.isprivate ? "공개상태" : "비공개상태"}
              </span>
            </div>
            <div className={styles.likeArea}>
              <Likey diaryId={diary?.id} madeUserID={diary?.createUser.uid} />
            </div>
          </div>
          <div className={styles.txt}>
            <Txt defaultValue={diary?.txt} />
          </div>
          <button onClick={goToBack} className={styles.BackBtn}>
            이전으로
          </button>
        </>
      ) : (
        <span>로딩중...</span>
      )}
    </section>
  );
};

export default Diary;
