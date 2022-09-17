import React from 'react';
import styles from './img.module.css';

const Img = ({baseUrl}:{baseUrl : string}) => {
    return (
        <div style={{backgroundImage:`url(${baseUrl})`}} className={styles.diaryImg}></div>
    )
}

export default Img
