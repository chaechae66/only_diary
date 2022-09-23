import React, { useCallback, useEffect, useState } from 'react';
import SlideBanner from '../components/slideBanner/slideBanner';
import styles from './styles/intro.module.css'
import DiaryList from '../components/diaryList/diaryList'
import { DiaryElem } from '../types/types';
import { getValues } from '../lib/service/firebase/database';

const Intro = () => {
    const [diaryList, setDiaryList] = useState<DiaryElem[] | null>(null);

    const fetchDiarys = useCallback(async () : Promise<void> => {
        try{
            let diaryData: DiaryElem[] | [] = await getValues<DiaryElem>("public");
            setDiaryList(diaryData);
        }catch(e){
            console.log(e);
        }
    },[])

    useEffect(()=>{
        !diaryList && fetchDiarys();
    },[diaryList,fetchDiarys])

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
