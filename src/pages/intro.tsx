import React from "react";
import SlideBanner from "../components/intro/SlideBanner/SlideBanner";
import styles from "./styles/intro.module.css";
import { DiaryElem } from "../types/types";
import { useGetValues } from "../hook/useGetValues";
import DiaryCard from "../components/diaryPage/DiaryCard/DiaryCard";

const Intro = () => {
  const diaryList = useGetValues<DiaryElem>("public");

  return (
    <div className={styles.wrap}>
      <SlideBanner />
      {!diaryList ? (
        <section className={styles.diaryWrap}>로딩중...</section>
      ) : (
        <section className={styles.diaryWrap}>
          <ul className={styles.diaryList}>
            {diaryList?.map(diary =>{
                  return <DiaryCard isPrivateDiary={false} key={diary.id} diary={diary} />
              })}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Intro;
