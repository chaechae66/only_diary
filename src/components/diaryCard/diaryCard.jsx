import React from 'react';
import styles from './diaryCard.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DiaryCard = ({myDiary, diary}) => {    
    
    const { currentUser } = useSelector(state => state.user);
    
    const url = () => {
        if(myDiary){
            return `/${currentUser.uid}/${diary.id}` 
        }else{
            return `/public/${diary.id}`
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