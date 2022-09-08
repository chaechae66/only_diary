import React, { forwardRef, useCallback } from 'react';
import styles from './diaryTextarea.module.css';

const DiaryTextarea = ({defaultValue,changeTxt}, txtRef) => {

    const handleTxt = (e) => {
        e.preventDefault();
        let currentTxt = e.target.value; 
        changeTxt(currentTxt);
    }

    const handleResizeHeight = useCallback(() => {
        if (txtRef === null || txtRef.current === null) {
            return;
        }
        txtRef.current.style.height = '64px';
        txtRef.current.style.height = txtRef.current.scrollHeight + 'px';
    }, [txtRef]);

    return (
        <div>
            <textarea 
            placeholder="당신의 이야기를 적어주세요" 
            onChange={(e)=>{
                handleTxt(e)
                handleResizeHeight()
            }} 
            className={styles.inputTxt}
            ref={txtRef}
            defaultValue={defaultValue}
        />
        </div>
    )
}

export default forwardRef(DiaryTextarea);