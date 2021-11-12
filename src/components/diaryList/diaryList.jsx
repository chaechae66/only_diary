import React from 'react';
import styles from './diaryList.module.css';
import DiaryCard from '../diaryCard/diaryCard';

const DiaryList = ({handleDelLikey, handleUpdateLikey, myDiary, diaryList}) => {
    return (
        <ul className={styles.diaryList}>
            {diaryList?.map(diary=>{
                return <DiaryCard myDiary={myDiary} key={diary.id} diary={diary} handleUpdateLikey={handleUpdateLikey} handleDelLikey={handleDelLikey}/>
            })}
        </ul>
    )
}

export default DiaryList