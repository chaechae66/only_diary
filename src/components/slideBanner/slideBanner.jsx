import React, { useEffect, useRef, useState } from 'react';
import Banner from '../banner/banner';
import styles from './slideBanner.module.css';

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

    const handleBanner = (e) => {
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
    
      const handlePrev = (e) => {
        e.preventDefault();
        setIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
      };
    
      const handleNext = (e) => {
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
                    <Banner />
                    <Banner />
                    <Banner />
                </div>  
        </section>
    )
}

export default SlideBanner
