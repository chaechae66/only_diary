import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const DiaryCardPage = () => {

    const {id} = useParams();

    useEffect(()=>{
        handlePrivateDiary();
    },[])

    const handlePrivateDiary = () => {}

    return (
        <div>
            diaryCardPage
        </div>
    )
}

export default DiaryCardPage
