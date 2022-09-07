import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Diary from '../components/diary/diary';
import { getOneVal } from '../lib/service/firebase/database';
import Page404 from './page404';

const DiaryCardPage = () => {
    const {id} = useParams();
    const [diary, setDiary] = useState(null);
    const [error, setError ] = useState(false);
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();

    const handlePrivateDiary = useCallback(async () => {
        try{
            const diaryInfo = await getOneVal(`diary/${currentUser?.uid}/${id}`);
            setDiary(diaryInfo);
        }catch(err){
            console.log('err',err);
            err && setError(true);
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
            {
                error ? <Page404 />   
                :   <Diary diary={diary}/>
            }
        </div>
    )
}

export default DiaryCardPage
