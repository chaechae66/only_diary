import React from 'react';
import SlideBanner from '../components/slideBanner/slideBanner';
import styles from './styles/intro.module.css'
import DiaryList from '../components/diaryList/diaryList'
import useFetch from '../lib/hooks/useFetch';
import { DiaryElem } from '../types/types';

const Intro = () => {
    const diaryList = useFetch<DiaryElem[]>("public");
    
    return (
        <div className={styles.wrap}>
            <SlideBanner />
            {
              !diaryList ? (
                <section className={styles.diaryWrap}>로딩중...</section>
              ) : (
                <section className={styles.diaryWrap}>
                  <DiaryList myDiary={false} diaryList ={diaryList} />
                </section>
              )
            }
        </div>
    )
}

export default Intro
