import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { swalAlert } from '../../service/sweetAlert/alret';
import { getLikeyValues, removeLikey, removeLikeyEvent, removeUserLikey, timeStamp, updateUserLikey, writeLikey, writeLikeyEvent } from '../../service/firebase/database';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import LikeyNum from '../likeyNum/likeyNum';

const Likey = ({ diaryId, madeUserID }) => {
    const [isLikey, setIsLikey] = useState(false);

    const history = useHistory();
    const currentUser = useSelector(state => state.user.currentUser);

    const handleLikey = useCallback(async (_userUid) => {
        let likey = await getLikeyValues(_userUid);
        likey.some((idElem) => idElem === diaryId ) && setIsLikey(true);
    },[diaryId]);

    useEffect(()=>{
        if(currentUser && diaryId){
            handleLikey(currentUser.uid);
        }else{
            setIsLikey(false);
        }
    },[currentUser,diaryId,handleLikey]);

    const isLikeyBtn = (e) => {
        e.preventDefault();
        if(!currentUser){
            swalAlert('warning','로그인 필요','좋아요 기능은 로그인 후 이용 바랍니다.');
            history.push('/login');
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
                writeLikeyFuc(diaryId,currentUser.uid,likeyData);
                wrtieLikeyEventFuc(madeUserID,diaryId,likeyEventData);
            }else{
                delLikeyFuc(diaryId,currentUser.uid);
                delLikeyEventFuc(madeUserID, diaryId);
            }
        }
    }

    const writeLikeyFuc = async (_diaryId, _currentUserUid, _data) => {
        await writeLikey(_diaryId, _currentUserUid, _data);
        await updateUserLikey(_currentUserUid,_diaryId);
    }

    const delLikeyFuc = async (_diaryId, _currentUserUid) => {
        await removeLikey(_diaryId, _currentUserUid);
        await removeUserLikey(_diaryId, _currentUserUid);
    }

    const wrtieLikeyEventFuc = async (_madeUserId, _diaryId ,_data) => {
        if(currentUser.uid !== _madeUserId){
            await writeLikeyEvent(_madeUserId, _diaryId, _data);
        }else{
            return;
        }
    }

    const delLikeyEventFuc = async (_madeUser, _diaryId) => {
        if(currentUser.uid !== _madeUser){
            await removeLikeyEvent(_madeUser, _diaryId);
        }else{
            return;
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
