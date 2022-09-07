import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router';
import DiaryList from '../components/diaryList/diaryList';
import NoDiary from '../components/noDiary/noDiary';
import styles from './styles/myDiary.module.css';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../lib/service/firebase/emailLogin';
import useFetch from '../lib/hooks/useFetch';

const MyDiary = () => {
    const user = useSelector(state => state.user.currentUser,shallowEqual);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!user){
            onAuthStateChanged(auth, (onlyUser) => {
                if (!onlyUser) {
                    navigate('/login');
                }
                });
        }else{
            return;
        }
    }, [user,navigate]);

    const diary = useFetch("diary",user.uid);
    
    useEffect(()=>{
        setLoading(true);
    },[diary,loading])

    return (
        <section className="bodyWrap">
            {
                loading ? (
                <>
                    <div className={styles.userInfo}>
                        <img src={user?.photoURL} alt={user?.displayName} className={styles.userURL}/>
                        <h2 className={styles.nameGroup}>
                            <span>{user?.displayName}님</span><br />
                            일기장
                        </h2>
                    </div>
                    <div className={styles.diarys}>
                        {
                            diary?.length === 0 ? (
                                <NoDiary />
                            ) : (
                                <DiaryList myDiary={true} diaryList={diary}/>
                            )
                        }
                    </div>
                </>
            ) :
            <div>로딩중...</div>
        }
        </section>
    )
}

export default MyDiary
