import React, { useEffect, useRef, useState } from 'react';
import Banner from '../banner/banner';
import styles from './slideBanner.module.css';
import bannerImg01 from '../../asset/images/main_banner_01.png';
import bannerImg02 from '../../asset/images/main_banner_02.png';
import bannerImg03 from '../../asset/images/main_banner_03.png';

const SlideBanner = () => {
    const slideIndexAry = [0, 1, 2];
    const [index, setIndex] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const timeoutRef = useRef(null);

    function resetTimeout() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  
    useEffect(() => {
      resetTimeout();
      if (isActive) {
        timeoutRef.current = setTimeout(
          () => setIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1)),
          3000
        );
      }
      return () => {
        resetTimeout();
      };
    }, [index, isActive]);

    const handleBanner = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (isActive) {
          resetTimeout();
          setIsActive(false);
        } else {
          timeoutRef.current = setTimeout(
            () => setIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1)),
            3000
          );
          setIsActive(true);
        }
      };
    
      const handlePrev = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
      };
    
      const handleNext = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setIndex((index) => (index === 2 ? 0 : index + 1));
      };
    

    return (
        <section className={styles.bannerWrap}>
            <div className={styles.bannerDots}>
                <div className={styles.prev} onClick={handlePrev}></div>
                {slideIndexAry.map((elem, idx) => (
                    <div
                    key={elem}
                    className={
                        index === idx
                        ? `${styles.activeDot} ${styles.dot}`
                        : `${styles.dot}`
                    }
                    onClick={() => {
                        setIndex(idx);
                    }}
                    ></div>
                ))}
                <div
                    className={isActive ? styles.stop : styles.start}
                    onClick={handleBanner}
                ></div>
                <div className={styles.next} onClick={handleNext}></div>
                </div>
                <div
                className={styles.bannerList}
                style={{
                    marginLeft: `${index * -100}vw`,
                    transition: "1s",
                }}
                >
                    <Banner 
                      color={"rgb(255, 238, 239)"} 
                      title1="나만의 소중한 공간," 
                      title2="로그인하여 함께해요" 
                      des1="나만의 소중한 공간, Only Diary에서 제공하는 예쁜 기본 이미지부터"
                      des2="커스텀 이미지까지 나의 특별한 일상을 공유하고, 소중히 간직해보아요"
                      bannerImg={bannerImg01}
                    />
                    <Banner 
                      color={"rgb(226, 241, 243)"} 
                      title1="나의 일기장 비공개모드로," 
                      title2="안전하게 나만의 일기장을 보관해요" 
                      des1="일기를 생성 시, 공개모드와 비공개모드로 설정할 수 있어"
                      des2="더욱 더 안전하게 보관할 수 있어요"
                      bannerImg={bannerImg02}
                    />
                    <Banner 
                      color={"rgb(225, 240, 210)"} 
                      title1="나의 행복한 일상을" 
                      title2="일기장 공개모드로 공유해요" 
                      des1="일기를 생성 시, 공개모드로 설정하여 행복한 일상들을"
                      des2="즐겁게 공유해보아요"
                      bannerImg={bannerImg03}
                    />
                </div>  
        </section>
    )
}

export default SlideBanner
