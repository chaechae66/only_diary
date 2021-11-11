import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Img from '../img/img';
import ShowDate from '../showDate/showDate';
import Txt from '../txt/txt';
import styles from './diary.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import { swalAlert } from '../../service/sweetAlert/alret';
import { updateUserLikey, writeLikey, removeLikey, removeUserLikey, getLikeyValues, getLikeyLength } from '../../service/firebase/database';

const Diary = ({diary}) => {
    const currentUser = useSelector(state => state.user.currentUser);
    const history = useHistory();
    const [isLikey, setIsLikey] = useState(false);
    const [LikeyNum, setLikeyNum] = useState(0);

    const goToBack = (e) => {
        e.preventDefault();
        history.goBack(1);
    }

    useEffect(()=>{
        currentUser && handleLikey(currentUser.uid);
    },[diary])

    useEffect(()=>{
        handleLikeyNum(diary?.id);
    },[diary,isLikey])

    const handleLikey = async (_userUid) => {
        let likey = await getLikeyValues(_userUid);
        likey.some((diaryId)=> diaryId === diary?.id) && setIsLikey(true);
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
                    uid : diary.createUser.uid,
                }
            }
            if(!isLikey){
                writeLikeyFuc(diary.id,currentUser.uid,likeyData);
            }else{
                delLikeyFuc(diary.id,currentUser.uid);
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

    const handleLikeyNum = async(_diaryId) => {
        const likeyLength = await getLikeyLength(_diaryId);
        setLikeyNum(likeyLength);
    }

    return (
        <section className={styles.wrap}>
            <div className={styles.userWrap}>
                <span className={styles.user}>{diary?.createUser.name}님의 일기</span>
                {
                    currentUser ?  (
                        currentUser.uid === diary?.createUser.uid ? (
                        <div className={styles.btnGroup}>
                            <button className={styles.editBtn}>수정</button>
                            <button className={styles.delBtn}>삭제</button>
                        </div>
                    )
                    : <></>
                    ) 
                    : 
                    <></>
                }
            </div>
            <Img baseUrl={diary?.img} />
            <div className={styles.option}>
                <div className={styles.optionInfo}>
                    <ShowDate date={diary?.date} />
                    <span className={styles.isPrivate}>
                        {
                            !diary?.isprivate ? "공개상태" : "비공개상태"
                        }
                    </span>
                </div>
                <div className={styles.likeArea}>
                    <div onClick={isLikeyBtn}>
                        {
                            isLikey ?
                            <FontAwesomeIcon icon={solidHeart} style={{width:'2.7rem',height:'2.7rem'}} color="rgb(250, 140, 107)"/>
                            :
                            <FontAwesomeIcon icon={faHeart} style={{width:'2.7rem',height:'2.7rem'}} color="#777"/>
                        }
                    </div>
                    <span className={styles.like}>{ LikeyNum === 0? "" :  LikeyNum}</span>
                </div>
            </div>
            <div className={styles.txt}>
                <Txt 
                    defaultValue={diary?.txt}
                />
            </div>
            <button
                onClick={goToBack}
                className={styles.BackBtn}
            >이전으로</button>
        </section>
    )
}

export default Diary
