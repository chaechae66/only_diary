import React, { useState } from 'react';
import styles from './diaryCard.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const DiaryCard = ({myDiary, diary}) => {
    const [isLikey, setIsLikey] = useState(false);

    const isLikeyBtn = (e) => {
        e.preventDefault();
        setIsLikey(!isLikey);
    }
    
    const url = () => {
        if(myDiary){
            return `/diaryCardPage/${diary.id}` 
        }else{
            return `/publicCardPage/${diary.id}`
        }
    }

    return (
        <li className={styles.diary}>
            <Link to={{
                pathname : url(),
            }}>
                <div 
                    className={styles.image}
                    style={{backgroundImage : `url(${diary.img})`}}>
                </div>
            </Link>
            <div className={styles.info}>
                <div className={styles.likeArea}>
                    <div onClick={isLikeyBtn}>
                        {
                            isLikey ?
                            <FontAwesomeIcon icon={solidHeart} style={{width:'1.9rem',height:'1.9rem'}} color="rgb(250, 140, 107)"/>
                            :
                            <FontAwesomeIcon icon={faHeart} style={{width:'1.9rem',height:'1.9rem'}} color="#777"/>
                        }
                    </div>
                    <span className={styles.like}>1개</span>
                </div>
                <div className={styles.userArea}>
                    <strong>{diary.createUser.name}님</strong>
                    <span className={styles.date}>{diary.date}</span>
                </div>
                <p className={styles.txt}>{diary.txt}</p>
            </div>
        </li>
    )
}

export default DiaryCard