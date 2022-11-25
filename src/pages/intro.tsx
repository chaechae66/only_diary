import React from "react";
import SlideBanner from "../components/intro/SlideBanner/SlideBanner";
import styles from "./styles/intro.module.css";
import DiaryList from "../components/diaryPage/DiaryList/DiaryList";
import { DiaryElem } from "../types/types";
import { useGetValues } from "../hook/useGetValues";

const Intro = () => {
  const diaryList = useGetValues<DiaryElem>("public");

  return (
    <div className={styles.wrap}>
      <SlideBanner />
      {!diaryList ? (
        <section className={styles.diaryWrap}>로딩중...</section>
      ) : (
        <section className={styles.diaryWrap}>
          <DiaryList myDiary={false} diaryList={diaryList} />
        </section>
      )}
    </div>
  );
};

export default Intro;
