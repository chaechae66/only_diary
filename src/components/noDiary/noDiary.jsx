import React from 'react'
import { useHistory } from 'react-router';
import styles from './noDiary.module.css'

const NoDiary = () => {
    const history = useHistory();
    
    const goToCreateDiary = (e) => {
        e.preventDefault();
        history.push('/createDiary');
    }
    return (
        <div className={styles.wrap}>
            <span className={styles.noDiaryTxt}>등록된 일기가 없습니다.</span>
            <button onClick={goToCreateDiary} className={styles.createDiaryBtn}>일기 추가</button>
        </div>
    )
}

export default NoDiary
