import React from 'react';
import styles from './txt.module.css';

const Txt = ({defaultValue}) => {
    return (
        <textarea 
            className={styles.inputTxt}
            defaultValue={defaultValue}
            disabled={true}
        />
    )
}

export default Txt
