import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate , useLocation } from 'react-router';
import styles from './styles/WriteDiary.module.css';
import default_01 from '../../src/asset/images/diary_default_01.jpg';
import { RootState } from '../store';
import type { DiaryElem } from '../types/types';
import createGetImg from '../util/createGetImg';
import { submitDiary } from '../util/submitDiary';
import { convertDate } from '../util/convertDate';
import { swalAlert } from '../service/sweetAlert/alert';
import ShowImage from '../components/writeDairy/ShowImage/ShowImage';
import ShowDate from '../components/writeDairy/ShowDate/ShowDate';
import ImgBox from '../components/writeDairy/ImgBox/ImgBox';
import DiaryTextarea from '../components/writeDairy/DiaryTextarea/DiaryTextarea';

interface CustomizedState {
    diary: DiaryElem
}

const WriteDiary = () => {
    const currentUser = useSelector((state:RootState) => state.user.currentUser );
    const navigate = useNavigate();
    const location = useLocation();
    const state = location?.state as CustomizedState | null
    
    const [baseUrl, setBaseUrl] = useState(default_01);
    const [isprivate,setIsprivate] = useState(false);
    const [fileInfo , setFileInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const txtRef = useRef<HTMLInputElement | null>(null);

    useEffect(()=> {
        if(!state){
            return;
        }else{
            const { diary } = state;
            setBaseUrl(diary.img);
            setIsprivate(diary.isprivate);
            txtRef.current.value = diary.txt;
        }
    },[state])

    const changePrivate = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if(state){
            swalAlert('warning', '수정 불가능', '모드는 수정이 불가능합니다.');
            return;
        }
        setIsprivate(prev => !prev);
    }

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const isGet = baseUrl.includes('https://firebasestorage.googleapis.com');
        const img = isGet? baseUrl : await createGetImg(isprivate, fileInfo, baseUrl);
        const diary = {
            isprivate,
            img,
            txt : txtRef.current.value,
            currentUser,
            navigate,
            diaryID : state? state.diary.id : null
        }
        await submitDiary(diary);
    }

    const changeTxt = (_changingTxt : string) => {
        txtRef.current.value = _changingTxt;   
    }

    const getImg = (img:string) =>{
        setBaseUrl(img);
    }

    const getFile = (file:File) =>{
        setFileInfo(file);
    }

    const goToBack = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate(-1);
    }

    return(
        <section className={styles.wrap}>
            <ImgBox getImg={getImg} getFile={getFile} />   
            <ShowImage baseUrl={baseUrl} />
            <div className={styles.option}>
                <ShowDate date={convertDate()} />
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
                    <div className={styles.btnGroup}>  
                        <button onClick={goToBack} className={styles.backbtn}>뒤로 가기</button>
                        <button className={styles.upload} type="submit">일기업로드</button>
                    </div> 
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

export default WriteDiary
