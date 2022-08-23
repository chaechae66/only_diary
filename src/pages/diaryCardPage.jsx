import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Diary from '../components/diary/diary';
import { getOnePrivateValue } from '../service/firebase/database';

const DiaryCardPage = () => {
    const {id} = useParams();
    const [diary, setDiary] = useState(null);
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();

    const handlePrivateDiary = useCallback(async () => {
        try{
            const diaryInfo = await getOnePrivateValue(currentUser?.uid,id);
            setDiary(diaryInfo);
        }catch(err){
            console.log('err',err);
        }
    },[currentUser,id]);

    useEffect(()=>{
        handlePrivateDiary();
    },[handlePrivateDiary]);

    useEffect(()=>{
        if(!currentUser){
            navigate('/login');
        }
    },[currentUser,navigate]);

    return (
        <div>
            <Diary diary={diary}/>
        </div>
    )
}

export default DiaryCardPage
