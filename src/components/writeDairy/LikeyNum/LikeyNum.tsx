import React, { useEffect, useState } from 'react'
import { getLikeyLength } from '../../../service/firebase/database';

interface PropsType {
    diaryId : string,
    isLikey : boolean,
}


const LikeyNum = ({ diaryId, isLikey }:PropsType) => {
    const [likeyNum, setLikeyNum] = useState(0);

    useEffect(()=>{
        handleLikeyNum(diaryId);
    },[diaryId,isLikey])

    const handleLikeyNum = async(_diaryId : string) => {
        const likeyLength : number = await getLikeyLength(_diaryId);
        setLikeyNum(likeyLength);
    }

    return (
        <span style={{fontSize:'1.6rem',marginLeft:'.8rem'}}>{ likeyNum === 0? "" :  likeyNum}</span>
    )
}

export default LikeyNum
