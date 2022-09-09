import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Diary from '../components/diary/diary';
import { getOneVal } from '../lib/service/firebase/database';
import Page404 from './page404';

const PublicCardPage = () => {
    const {id} = useParams();
    const [diary, setDiary] = useState(null);
    const [error,setError] = useState(false);

    const handlePrivateDiary = useCallback(async () => {
        try{
            const diaryInfo = await getOneVal(`public/${id}`);
            setDiary(diaryInfo);
        }catch(err){
            console.log('err',err);
            err && setError(true);
        }
    },[id])

    useEffect(()=>{
        handlePrivateDiary();
    },[id,handlePrivateDiary])
    
    return (
        <>
            {
                error ? <Page404 />
                : <Diary diary={diary}/>
            }
        </>
    )
}

export default PublicCardPage
