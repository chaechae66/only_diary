import React from 'react';
import styles from './diaryList.module.css';
import DiaryCard from '../diaryCard/diaryCard';

const DiaryList = ({myDiary,diaryList}) => {
    return (
        <ul className={styles.diaryList}>
            {diaryList?.map(diary=>{
                return <DiaryCard myDiary={myDiary} key={diary.id} diary={diary} />
            })}
        </ul>
    )
}

export default DiaryList