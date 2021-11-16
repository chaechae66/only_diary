import React, { forwardRef } from 'react';
import styles from './diaryTextarea.module.css';

const DiaryTextarea = ({defaultValue,changeTxt, handleResizeHeight}, txtRef) => {

    const handleTxt = (e) => {
        e.preventDefault();
        let currentTxt = e.target.value; 
        changeTxt(currentTxt);
    }

    const handleHeight = () => {
        handleResizeHeight();
    }

    return (
        <textarea 
            placeholder="당신의 이야기를 적어주세요" 
            onChange={(e)=>{
                handleTxt(e)
                handleHeight()
            }} 
            className={styles.inputTxt}
            ref={txtRef}
            defaultValue={defaultValue}
        />
    )
}

export default forwardRef(DiaryTextarea);