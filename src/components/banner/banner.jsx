import React from 'react';
import styles from './banner.module.css';
import bannerImg from '../../images/main_banner_01.png';

const Banner = () => {
    return (
        <div className={styles.banner}>
        <div className={styles.wrap}>
        <div className={styles.txt}>
            <h2>
            나만의 소중한 공간,
            <br />
            로그인하여 함께해요1111
            </h2>
            <p>
            나만의 소중한 공간, Only Diary에서 제공하는 예쁜 기본 이미지
            부터
            <br />
            커스텀 이미지까지 나의 특별한 일상을 공유하고, 소중히
            간직해보아요
            </p>
        </div>
        <img src={bannerImg} alt="메인배너 이미지" style={{width:'50rem',height:'50rem'}}/>
        </div>
    </div>
    )
}

export default Banner
