import React, { useEffect, useState } from 'react';
import SlideBanner from '../components/slideBanner/slideBanner';
import { getValues } from '../service/firebase/database';
import styles from './styles/intro.module.css'
import DiaryList from '../components/diaryList/diaryList'

const Intro = () => {
    const [diaryList, setDiaryList] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
      onhandlePublicDiary();
    },[])
  
    const onhandlePublicDiary = async () => {
      try{
        setLoading(true)
        const diary = await getValues("public")
        setDiaryList(diary)
        setLoading(false)
      }catch(e){
          alert(e)
      }
    }

    return (
        <div className={styles.wrap}>
            <SlideBanner />
            {
              loading? (
                <section className={styles.diaryWrap}>로딩중...</section>
              ) : (
                <section className={styles.diaryWrap}>
                  <DiaryList myDiary={false} diaryList={diaryList} />
                </section>
              )
            }
        </div>
    )
}

export default Intro
