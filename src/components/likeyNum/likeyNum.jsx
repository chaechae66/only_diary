import React, { useEffect, useState } from 'react'
import { getLikeyLength } from '../../service/firebase/database';

const LikeyNum = ({ diaryId, isLikey }) => {
    const [likeyNum, setLikeyNum] = useState(0);

    useEffect(()=>{
        handleLikeyNum(diaryId);
    },[diaryId,isLikey])

    const handleLikeyNum = async(_diaryId) => {
        const likeyLength = await getLikeyLength(_diaryId);
        setLikeyNum(likeyLength);
    }

    return (
        <span style={{fontSize:'1.6rem',marginLeft:'.8rem'}}>{ likeyNum === 0? "" :  likeyNum}</span>
    )
}

export default LikeyNum
