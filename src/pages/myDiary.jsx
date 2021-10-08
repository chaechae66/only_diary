import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import DiaryList from '../components/diaryList/diaryList';
import NoDiary from '../components/noDiary/noDiary';
import { getValues } from '../service/firebase/database';
import styles from './styles/myDiary.module.css'

const MyDiary = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const history = useHistory();

    const [diary, setDiary] = useState(null)

    useEffect(()=>{
        onhandleUserDiary();
    },[])

    useState(()=>{
        if(!currentUser){
            history.push('/login');
        }    
    },[])

    const onhandleUserDiary = async () => {
        const diary = await getValues("diary",currentUser.uid)
        setDiary(diary)
    }
    

    return (
        <section className="bodyWrap">
            <div className={styles.userInfo}>
                <img src={currentUser.photoURL} alt={currentUser.displayName} className={styles.userURL}/>
                <h2 className={styles.nameGroup}>
                    <span>{currentUser.displayName}님</span><br />
                    일기장
                </h2>
            </div>
            <div className={styles.diarys}>
                {
                    diary?.length === 0 ? (
                        <NoDiary />
                    ) : (
                        <DiaryList diaryList={diary}/>
                    )
                }
            </div>
        </section>
    )
}

export default MyDiary
