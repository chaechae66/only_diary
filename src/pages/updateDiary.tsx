import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Img from '../components/img/img';
import ImgBox from '../components/imgBox/imgBox';
import styles from './styles/createDiary.module.css';
import default_01 from '../../src/asset/images/diary_default_01.jpg';
import default_02 from '../../src/asset/images/diary_default_02.jpg';
import default_03 from '../../src/asset/images/diary_default_03.jpg';
import default_04 from '../../src/asset/images/diary_default_04.jpg';
import { getDate, submitDiary } from '../lib/api/submitDiary';
import ShowDate from '../components/showDate/showDate';
import { swalAlert } from '../lib/service/sweetAlert/alert';
import DiaryTextarea from '../components/diaryTextarea/diaryTextarea';
import createGetImg from '../lib/api/createGetImg';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { DiaryElem } from '../types/types';

interface CustomizedState {
    diary: DiaryElem
}

function UpdateDiary() {
    const location = useLocation();
    const state = location.state as CustomizedState
    const { diary } = state;
    const currentUser = useSelector((state: RootState) => state.user.currentUser );
    const navigate = useNavigate();

    const [imgURL, setImgURL] = useState(diary.img);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const txtRef = useRef(null);

    const changeTxt = (_changingTxt:React.ChangeEvent) => {
        txtRef.current.value = _changingTxt;   
    }

    const getImg = (img:string) => {
        setImgURL(img);
    }

    const getFile = (file:File) => {
        setFile(file);
    }

    const showModal = (e:React.MouseEvent<HTMLElement>) =>{
        e.preventDefault();
        swalAlert('warning', '수정 불가능', '모드는 수정이 불가능합니다.')
    }

    const submit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const isGet = imgURL.includes('https://firebasestorage.googleapis.com');
        let img = !isGet? await createGetImg(diary.isprivate, file, imgURL) : imgURL;
        await submitDiary(diary.isprivate,img,txtRef.current.value,currentUser,navigate,diary.id);
    }

    return (
        <section className={styles.wrap}>
            <ImgBox getImg={getImg} getFile={getFile}/>
            <Img baseUrl={imgURL}/>
            <div className={styles.option}>
                <ShowDate date={getDate()} />
                <div className={styles.publicOption} onClick={showModal}>
                    <span>
                        {
                            !diary.isprivate ? "공개" : "비공개"
                        }
                    </span>
                    <div className={!diary.isprivate ? styles.active : styles.noneActive}>
                    </div>
                </div>
            </div>
            <form onSubmit={submit}>
                <DiaryTextarea 
                    defaultValue={diary.txt} 
                    changeTxt={changeTxt}
                    ref={txtRef}
                />
                {
                    !loading ?
                    <button className={styles.upload} type="submit">수정완료</button>
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

export default UpdateDiary