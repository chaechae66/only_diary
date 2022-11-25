import React, { useRef } from 'react';
import default_01 from '../../../asset/images/diary_default_01.jpg';
import default_02 from '../../../asset/images/diary_default_02.jpg';
import default_03 from '../../../asset/images/diary_default_03.jpg';
import default_04 from '../../../asset/images/diary_default_04.jpg';
import styles from './ImgBox.module.css'

interface ImgBoxProps{
    getImg : Function,
    getFile : Function,
}

const ImgBox:React.FC<ImgBoxProps> = ({getImg, getFile}) => {
    const imgRef = useRef<HTMLInputElement>();
    const sendImg = (img:string, e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        getImg(img);
    }
    const previewImg = (e :React.MouseEvent<HTMLElement> ) => {
        e.preventDefault();
        imgRef.current.click();
    }
    const changeImg = (e :React.ChangeEvent ) => {
        const fileReader = new FileReader();
        getFile((e.target as HTMLInputElement).files[0]);
        fileReader.readAsDataURL((e.target as HTMLInputElement).files[0]);
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