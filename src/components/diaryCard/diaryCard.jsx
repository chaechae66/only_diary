import React from 'react';
import styles from './diaryCard.module.css';
import { Link } from 'react-router-dom';
import Likey from '../likey/likey';

const DiaryCard = ({myDiary, diary}) => {    
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
                {/* <Likey diaryId={diary?.id} madeUserID={diary?.createUser.uid} handleUpdateLikey={handleUpdateLikey} handleDelLikey={handleDelLikey}/> */}
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