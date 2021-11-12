import React, { useEffect, useState } from 'react';
import SlideBanner from '../components/slideBanner/slideBanner';
import { getValues, removeLikey, removeUserLikey, updateUserLikey, writeLikey } from '../service/firebase/database';
import styles from './styles/intro.module.css'
import DiaryList from '../components/diaryList/diaryList'
import { useSelector } from 'react-redux';

const Intro = () => {
    const [diaryList, setDiaryList] = useState(null);
    const [loading, setLoading] = useState(true);

    const currentUser = useSelector(state => state.user.currentUser);

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

    const handleUpdateLikey = async (_diaryId, _madeUserID) => {
      let likeyData = {
        likeyUser : {
            uid : currentUser.uid,
            name : currentUser.displayName,
            photoURL : currentUser.photoURL,
        },
        madeUser : {
            uid : _madeUserID,
        }
      }
      await writeLikey(_diaryId, currentUser.uid, likeyData);
      await updateUserLikey(currentUser.uid, _diaryId);
    }

    const handleDelLikey = async (_diaryId) => {
      await removeLikey(_diaryId, currentUser.uid);
      await removeUserLikey(_diaryId, currentUser.uid);
    }

    return (
        <div className={styles.wrap}>
            <SlideBanner />
            {
              loading? (
                <section className={styles.diaryWrap}>로딩중...</section>
              ) : (
                <section className={styles.diaryWrap}>
                  <DiaryList myDiary={false} diaryList={diaryList} handleUpdateLikey={handleUpdateLikey} handleDelLikey={handleDelLikey}/>
                </section>
              )
            }
        </div>
    )
}

export default Intro
