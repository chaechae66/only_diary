import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Diary from '../components/diary/diary';
import { getOnePublicValue } from '../service/firebase/database';

const PublicCardPage = () => {

    const {id} = useParams();

    useEffect(()=>{
        handlePrivateDiary();
    },[])

    const handlePrivateDiary = async () => {
        const diary = await getOnePublicValue(id);
        console.log('diary',diary);
    }

    return (
        <>
            <Diary />
        </>
    )
}

export default PublicCardPage
