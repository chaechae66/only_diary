import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { swalAlert } from '../../service/sweetAlert/alret';
import { getLikeyValues, removeLikey, removeUserLikey, updateUserLikey, writeLikey } from '../../service/firebase/database';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import LikeyNum from '../likeyNum/likeyNum';

const Likey = ({ diaryId, madeUserID }) => {
    const [isLikey, setIsLikey] = useState(false);

    const history = useHistory();
    const currentUser = useSelector(state => state.user.currentUser);

    useEffect(()=>{
        currentUser && handleLikey(currentUser.uid);
    },[diaryId]);

    const handleLikey = async (_userUid) => {
        let likey = await getLikeyValues(_userUid);
        likey.some((idElem)=> idElem === diaryId) && setIsLikey(true);
    }
    
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
            if(!isLikey){
                writeLikeyFuc(diaryId,currentUser.uid,likeyData);
            }else{
                delLikeyFuc(diaryId,currentUser.uid);
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

    return (
        <>
            <div onClick={isLikeyBtn}>
                {
                    isLikey ?
                    <FontAwesomeIcon icon={solidHeart} style={{width:'2.7rem',height:'2.7rem'}} color="rgb(250, 140, 107)"/>
                    :
                    <FontAwesomeIcon icon={faHeart} style={{width:'2.7rem',height:'2.7rem'}} color="#777"/>
                }
            </div>
            <LikeyNum diaryId={diaryId} isLikey={isLikey} />
        </>
    )
}

export default Likey
