import React, { useState } from 'react';
import styles from './menu.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
    const [diaryShow, setDiaryShow] = useState("none");

    return (
        <div 
            className={styles.diaryWrap}
            onMouseOver={()=>{setDiaryShow("block")}}
            onMouseOut={()=>{setDiaryShow("none")}}
        >
            <div className={styles.diary}>
            <FontAwesomeIcon icon={faBars} size="2x" color="#fc8b79"/>
            </div>
            <ul className={styles.diarymenu} style={{display:diaryShow}}>
                <Link to="/myDiary">
                <li>나의 일기</li>
                </Link>
                <Link to="/createDiary">
                <li>일기 추가</li>
                </Link>
            </ul>
        </div>
    )
}

export default Menu
