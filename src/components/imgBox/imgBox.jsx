import React, { useRef } from 'react';
import default_01 from '../../asset/images/diary_default_01.jpg';
import default_02 from '../../asset/images/diary_default_02.jpg';
import default_03 from '../../asset/images/diary_default_03.jpg';
import default_04 from '../../asset/images/diary_default_04.jpg';
import styles from './imgBox.module.css'

function ImgBox({getImg, getFile}) {
    const imgRef = useRef();
    const sendImg = (img, e) => {
        e.preventDefault();
        getImg(img);
    }
    const previewImg = (e) => {
        e.preventDefault();
        imgRef.current.click();
    }
    const changeImg = (e) => {
        const fileReader = new FileReader();
        getFile(e.target.files[0]);
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = function(e) { 
            getImg(e.target.result);
        }
    }
    return (
    <div className={styles.imgBox}>
        <div className={styles.defaultImgBox}>
        <img onClick={(e) => {sendImg(default_01,e)}} className={styles.defaultImg} src={default_01} alt="기본제공이미지01" />
        <img onClick={(e) => {sendImg(default_02,e)}} className={styles.defaultImg} src={default_02} alt="기본제공이미지02" />
        <img onClick={(e) => {sendImg(default_03,e)}} className={styles.defaultImg} src={default_03} alt="기본제공이미지03" />
        <img onClick={(e) => {sendImg(default_04,e)}} className={styles.defaultImg} src={default_04} alt="기본제공이미지04" />
        </div>
        <button className={styles.ImgBtn} onClick={previewImg}>
            이미지업로드
        </button>
        <input 
            ref={imgRef} 
            type="file" 
            accept="image/jpeg, image/png" 
            style={{display:'none'}}
            onChange={changeImg}
        />
    </div>
    )
}

export default ImgBox