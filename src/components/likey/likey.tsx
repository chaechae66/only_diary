import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { swalAlert } from '../../lib/service/sweetAlert/alert';
import { getLikeyValues, removeDB, saveDB, timeStamp } from '../../lib/service/firebase/database';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import LikeyNum from '../likeyNum/likeyNum';
import { RootState } from '../../store';

interface PropsType {
    diaryId : string,
    madeUserID : string,
}

const Likey = ({ diaryId, madeUserID } : PropsType) => {
    const [isLikey, setIsLikey] = useState(false);

    const navigate = useNavigate();
    const currentUser = useSelector((state : RootState) => state.user.currentUser);

    const handleLikey = useCallback(async (_userUid:string) => {
        let likey : string[] = await getLikeyValues(_userUid);
        likey.some((idElem) => idElem === diaryId ) && setIsLikey(true);
    },[diaryId]);

    useEffect(()=>{
        if(currentUser && diaryId){
            handleLikey(currentUser.uid);
        }else{
            setIsLikey(false);
        }
    },[currentUser,diaryId,handleLikey]);

    const isLikeyBtn = async (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if(!currentUser){
            swalAlert('warning','로그인 필요','좋아요 기능은 로그인 후 이용 바랍니다.');
            navigate('/login');
        }else{
            setIsLikey(!isLikey);
            let likeyData = {
                likeyUser : {
                    uid : currentUser.uid,
                    name : currentUser.displayName,
                    photoURL : currentUser.photoURL,
                },
                madeUser : {
                    uid : madeUserID,
                }
            }
            let likeyEventData = {
                diaryId : diaryId,
                likeyUser : {
                    uid : currentUser.uid,
                    name : currentUser.displayName,
                    photoURL : currentUser.photoURL,
                },
                timeStamp : timeStamp,
            }
            if(!isLikey){
                let IDdata = {
                    diaryId,
                }
                await saveDB(`likey/${diaryId}/${currentUser.uid}`,likeyData);
                await saveDB(`users/${currentUser.uid}/likeyDiary/${diaryId}`,IDdata);
                if(currentUser.uid !== madeUserID){
                    await saveDB(`event/${madeUserID}/${diaryId}`,likeyEventData)
                }
            }else{
                await removeDB(`likey/${diaryId}/${currentUser.uid}`)
                await removeDB(`users/${currentUser.uid}/likeyDiary/${diaryId}`)
                if(currentUser.uid !== madeUserID){
                    await removeDB(`event/${madeUserID}/${diaryId}`)
                }
            }
        }
    }

    return (
        <div style={{display:'flex',}}>
            <div 
            onClick={isLikeyBtn} 
            >
                {
                    isLikey ?
                    <FontAwesomeIcon icon={solidHeart} style={{width:'2rem',height:'2rem',marginTop:'.2rem'}} color="rgb(250, 140, 107)"/>
                    :
                    <FontAwesomeIcon icon={faHeart} style={{width:'2rem',height:'2rem',marginTop:'.2rem'}} color="#777"/>
                }
            </div>
            <LikeyNum diaryId={diaryId} isLikey={isLikey} />
        </div>
    )
}

export default Likey
