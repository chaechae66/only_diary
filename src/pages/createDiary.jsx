import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import default_01 from '../../src/asset/images/diary_default_01.jpg';
import default_02 from '../../src/asset/images/diary_default_02.jpg';
import default_03 from '../../src/asset/images/diary_default_03.jpg';
import default_04 from '../../src/asset/images/diary_default_04.jpg';
import DiaryTextarea from '../components/diaryTextarea/diaryTextarea';
import Img from '../components/img/img';
import ShowDate from '../components/showDate/showDate';
import styles from './styles/createDiary.module.css';
import createGetImg from '../hooks/createGetImg';
import { getDate, submitDiary } from '../hooks/submitDiary';

const CreateDiary = () => {
    const currentUser = useSelector(state => state.user.currentUser );
    const navigate = useNavigate();
    
    const [baseUrl, setBaseUrl] = useState(default_01);
    const [isprivate,setIsprivate] = useState(false);
    const [fileInfo , setFileInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const inputFileRef = useRef(null);
    const txtRef = useRef(null);
    
    useEffect(()=>{
        return ()=>{
            setLoading(false);
        }
    },[])

    const handleImg = (e) => {
        e.preventDefault();
        setBaseUrl(e.target.getAttribute("src"));
    }

    const previewImg = (e) => {
        e.preventDefault();
        inputFileRef.current.click();
    }

    const changeImg = (e) => {
        e.preventDefault();
        const fileReader = new FileReader();
        setFileInfo(e.target.files[0]);
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = function(e) { 
            setBaseUrl(e.target.result);
        }
    }

    const changePrivate = (e) => {
        e.preventDefault();
        setIsprivate(prev => !prev);
    }

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let img = await createGetImg(isprivate, fileInfo, baseUrl);
        await submitDiary(isprivate,img,txtRef,currentUser,navigate);
    }

    const handleResizeHeight = useCallback(() => {
        if (txtRef === null || txtRef.current === null) {
            return;
        }
        txtRef.current.style.height = '64px';
        txtRef.current.style.height = txtRef.current.scrollHeight + 'px';
    }, [txtRef]);

    useEffect(()=>{
        handleResizeHeight();
    },[handleResizeHeight]);

    const changeTxt = (_changingTxt) => {
        txtRef.current.value = _changingTxt;   
    }

    return(
        <section className={styles.wrap}>
            <div className={styles.imgBox}>
                <div className={styles.defaultImgBox}>
                    <img onClick={handleImg} className={styles.defaultImg} src={default_01} alt="기본제공이미지01" />
                    <img onClick={handleImg} className={styles.defaultImg} src={default_02} alt="기본제공이미지02" />
                    <img onClick={handleImg} className={styles.defaultImg} src={default_03} alt="기본제공이미지03" />
                    <img onClick={handleImg} className={styles.defaultImg} src={default_04} alt="기본제공이미지04" />
                </div>
                <button className={styles.ImgBtn} onClick={previewImg}>
                    이미지업로드
                </button>
                <input 
                ref={inputFileRef} 
                type="file" 
                accept="image/*" 
                style={{display:'none'}}
                onChange={changeImg}
                />
            </div>   
            <Img baseUrl={baseUrl} />
            <div className={styles.option}>
                <ShowDate date={getDate()} />
                <div onClick={changePrivate} className={styles.publicOption}>
                    <span>
                        {
                            !isprivate ? "공개" : "비공개"
                        }
                    </span>
                    <div className={!isprivate ? styles.active : styles.noneActive}>
                    </div>
                </div>
            </div>
            <form onSubmit={submit}>
                <div className={styles.txt}>
                    <DiaryTextarea 
                        defaultValue={null} 
                        changeTxt={changeTxt}
                        handleResizeHeight={handleResizeHeight}
                        ref={txtRef}
                    />
                </div>
                {
                    !loading ?
                    <button className={styles.upload} type="submit">일기업로드</button>
                    :
                    <button 
                        className={styles.upload}
                        disabled={true}
                    >
                        <span className={styles.spinner}></span>
                        <span className={styles.spinnerTxt}>로딩중</span>
                    </button>
                }
            </form>
        </section>
    )
}

export default CreateDiary
