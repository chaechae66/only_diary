import React from 'react';
import SlideBanner from '../components/slideBanner/slideBanner';
import styles from './styles/intro.module.css'

const Intro = () => {
    return (
        <div className={styles.wrap}>
            <SlideBanner />
            <section>
                intro
            </section>
        </div>
    )
}

export default Intro
