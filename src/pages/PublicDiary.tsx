import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Diary from '../components/writeDairy/Diary/Diary';
import { getOneVal } from '../service/firebase/database';
import Page404 from './Page404';

const PublicDiary = () => {
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

export default PublicDiary
