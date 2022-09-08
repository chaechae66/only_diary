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
import createGetImg from '../lib/api/createGetImg';
import { getDate, submitDiary } from '../lib/api/submitDiary';
import ImgBox from '../components/imgBox/imgBox';

const CreateDiary = () => {
    const currentUser = useSelector(state => state.user.currentUser );
    const navigate = useNavigate();
    
    const [baseUrl, setBaseUrl] = useState(default_01);
    const [isprivate,setIsprivate] = useState(false);
    const [fileInfo , setFileInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const txtRef = useRef(null);
    
    useEffect(()=>{
        return ()=>{
            setLoading(false);
        }
    },[])

    const changePrivate = (e) => {
        e.preventDefault();
        setIsprivate(prev => !prev);
    }

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let img = await createGetImg(isprivate, fileInfo, baseUrl);
        await submitDiary(isprivate,img,txtRef,currentUser,navigate);
        console.log('all', isprivate,img,txtRef,currentUser);
    }

    const changeTxt = (_changingTxt) => {
        txtRef.current.value = _changingTxt;   
    }

    const getImg = (img) =>{
        setBaseUrl(img);
    }

    const getFile = (file) =>{
        setFileInfo(file);
    }

    return(
        <section className={styles.wrap}>
            <ImgBox getImg={getImg} getFile={getFile} />   
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
                <DiaryTextarea 
                    defaultValue={null} 
                    changeTxt={changeTxt}
                    ref={txtRef}
                />
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
