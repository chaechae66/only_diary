import React from 'react';
import styles from './ShowImage.module.css';

const ShowImage = ({baseUrl}:{baseUrl : string}) => {
    return (
        <div style={{backgroundImage:`url(${baseUrl})`}} className={styles.diaryImg}></div>
    )
}

export default ShowImage
