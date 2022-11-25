import React, { forwardRef, useCallback } from 'react';
import styles from './DiaryTextarea.module.css';

const DiaryTextarea = ({defaultValue,changeTxt} :{defaultValue: string, changeTxt: Function}, txtRef:any) => {

    const handleTxt = (e:React.ChangeEvent) => {
        e.preventDefault();
        let currentTxt = (e.target as HTMLInputElement).value; 
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