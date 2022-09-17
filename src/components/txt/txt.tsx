import React from 'react';
import styles from './txt.module.css';

const Txt = ({defaultValue}:{defaultValue : string}) => {
    return (
        <pre
            className={styles.inputTxt}>
        {`${defaultValue}`}
        </pre>
    )
}

export default Txt
