import React, { useState } from 'react';
import styles from './alertMenu.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import AlertMenuLi from '../alertMenuLi/alertMenuLi';

const AlertMenu = () => {

    const [alertShow, setAlertShow] = useState("none");

    return (
        <div 
            className={styles.alertWrap}
            onMouseOver={()=>{setAlertShow("block")}}
            onMouseOut={()=>{setAlertShow("none")}}
        >
            <div className={styles.alert}>
            <FontAwesomeIcon icon={faBell} size="2x" color="#777"/>
            </div>
            <ul className={styles.alertMenu} style={{ display : alertShow }} >
                <AlertMenuLi />
            </ul>
        </div>
    )
}

export default AlertMenu
