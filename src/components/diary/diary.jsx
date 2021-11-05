import React from 'react';
import { useSelector } from 'react-redux';
import Img from '../img/img';
import ShowDate from '../showDate/showDate';
import Txt from '../txt/txt';
import styles from './diary.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const Diary = ({diary}) => {
    const currentUser = useSelector(state => state.user.currentUser);

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
                <ShowDate date={diary?.date} />
                {
                    !diary?.isprivate ? "공개상태" : "비공개상태"
                }
            </div>
            <div className={styles.txt}>
                <Txt 
                    defaultValue={diary?.txt}
                />
            </div>
            <div className={styles.likeArea}>
                    <FontAwesomeIcon icon={faHeart} style={{width:'2.7rem',height:'2.7rem'}} color="#333"/>
                    <span className={styles.like}>1개</span>
            </div>
        </section>
    )
}

export default Diary
