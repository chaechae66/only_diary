import React, { useCallback, useEffect, useState } from 'react';
import { useSelector , useDispatch, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router';
import DiaryList from '../components/diaryList/diaryList';
import NoDiary from '../components/noDiary/noDiary';
import { getValues } from '../service/firebase/database';
import styles from './styles/myDiary.module.css';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../service/firebase/emailLogin';
import { userLogIn } from '../redux/actions/user_action';

const MyDiary = () => {
    const user = useSelector(state => state.user.currentUser,shallowEqual);
    const dispatch = useDispatch();
    const history = useHistory();

    const [diary, setDiary] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!user){
            onAuthStateChanged(auth, (onlyUser) => {
                 if (onlyUser) {
                   dispatch(userLogIn(onlyUser));
                 } else {
                   history.push('/login');
                 }
             });
        }else{
            return;
        }
    }, [user,dispatch,history]);

    const onhandleUserDiary = useCallback(async () => {
        let isComponentMounted = true
        if(user){
            const diaryList = await getValues("diary",user.uid);
            isComponentMounted && setDiary(diaryList);
            setLoading(true);
        }
        return () => {
            isComponentMounted = false;
        }
    },[user]);

    useEffect(()=>{
        onhandleUserDiary();
    },[onhandleUserDiary]);

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
