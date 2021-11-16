import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Diary from '../components/diary/diary';
import { getOnePublicValue } from '../service/firebase/database';

const PublicCardPage = () => {
    const {id} = useParams();
    const [diary, setDiary] = useState(null);

    useEffect(()=>{
        handlePrivateDiary();
    },[id])

    const handlePrivateDiary = async () => {
        const diaryInfo = await getOnePublicValue(id);
        setDiary(diaryInfo);
    }

    return (
        <>
            <Diary diary={diary}/>
        </>
    )
}

export default PublicCardPage
