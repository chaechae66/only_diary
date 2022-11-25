import React from 'react';
import styles from './DiaryList.module.css';
import DiaryCard from '../DiaryCard/DiaryCard';
import { DiaryElem } from '../../../types/types';

const DiaryList = ({myDiary , diaryList} : { myDiary : boolean, diaryList : DiaryElem[] }) => {
    return (
        <ul className={styles.diaryList}>
            {diaryList?.map(diary =>{
                return <DiaryCard myDiary={myDiary} key={diary.id} diary={diary} />
            })}
        </ul>
    )
}

export default DiaryList