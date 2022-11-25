import React from 'react';
import styles from './Banner.module.css';

interface BannerProps {
    color : string,
    title1 : string,
    title2 :string,
    des1 : string, 
    des2 : string, 
    bannerImg : string,
}

const Banner: React.FC<BannerProps>  = ({ color, title1, title2, des1, des2, bannerImg } ) => {
    return (
        <div style={{backgroundColor : color}} className={styles.banner}>
            <div className={styles.wrap}>
                <div className={styles.txt}>
                    <h2>
                    {title1}
                    <br />
                    {title2}
                    </h2>
                    <p>
                    {des1}
                    <br />
                    {des2}
                    </p>
                </div>
                <img src={bannerImg} alt="메인배너 이미지" className={styles.img} />
            </div>
        </div>
    )
}

export default Banner
