import React from 'react';
import SlideBanner from '../components/slideBanner/slideBanner';
import styles from './styles/intro.module.css'
import DiaryList from '../components/diaryList/diaryList'
import useFetch from '../lib/hooks/useFetch';
import { FetchData } from '../types/types';

const Intro = () => {
    const diaryList:FetchData = useFetch("public");

    console.log('타입체크',diaryList);

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
