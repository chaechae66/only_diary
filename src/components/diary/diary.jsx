import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Img from '../img/img';
import ShowDate from '../showDate/showDate';
import Txt from '../txt/txt';
import styles from './diary.module.css'
import { useHistory } from 'react-router';
import Likey from '../likey/likey';
import { swalAlert } from '../../service/sweetAlert/alert';

const Diary = ({ diary }) => {
    const currentUser = useSelector(state => state.user.currentUser);
    const history = useHistory();

    const [loading, setLoading] = useState(false);

    const goToBack = (e) => {
        e.preventDefault();
        history.goBack(1);
    }

    const alertBtn = (e) => {
        e.preventDefault();
        swalAlert('info','안내','준비 중입니다. 좀 더 멋진 모습으로 뵙겠습니다.');
    }

    useEffect(()=>{
        diary && setLoading(true);
    },[diary])

    return (
        <section className={styles.wrap}>
            {
                loading? (
                    <>
                        <div className={styles.userWrap}>
                            <span className={styles.user}>{diary?.createUser.name}님의 일기</span>
                            {
                                currentUser ?  (
                                    currentUser.uid === diary?.createUser.uid ? (
                                    <div className={styles.btnGroup}>
                                        <button 
                                            className={styles.editBtn}
                                            onClick={alertBtn}
                                        >수정</button>
                                        <button 
                                            className={styles.delBtn}
                                            onClick={alertBtn}
                                        >삭제</button>
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
                                <Likey diaryId={diary?.id} madeUserID={diary?.createUser.uid}/>
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
                    </>
                ) : <span>로딩중...</span>
            }
        </section>
    )
}

export default Diary
