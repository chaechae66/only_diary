import React from 'react';
import styles from './DiaryCard.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DiaryElem } from '../../../types/types';
import { RootState } from '../../../store/index';

const DiaryCard = ({isPrivateDiary, diary} :{isPrivateDiary : boolean, diary: DiaryElem}) => {    
    const { currentUser } = useSelector((state : RootState) => state.user);
    
    const url = () => {
        return isPrivateDiary ? `/${currentUser.user_seqno}/${diary.id}` : `/public/${diary.id}`
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