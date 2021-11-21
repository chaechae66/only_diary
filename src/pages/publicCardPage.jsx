import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Diary from '../components/diary/diary';
import { getOnePublicValue } from '../service/firebase/database';

const PublicCardPage = () => {
    const {id} = useParams();
    const [diary, setDiary] = useState(null);

    const handlePrivateDiary = useCallback(async () => {
        try{
            const diaryInfo = await getOnePublicValue(id);
            setDiary(diaryInfo);
        }catch(err){
            console.log('err',err);
        }
    },[id])

    useEffect(()=>{
        handlePrivateDiary();
    },[id,handlePrivateDiary])

    return (
        <>
            <Diary diary={diary}/>
        </>
    )
}

export default PublicCardPage
