import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector , shallowEqual } from 'react-redux';
import { useHistory } from 'react-router';
import default_01 from '../../src/images/diary_default_01.jpg';
import default_02 from '../../src/images/diary_default_02.jpg';
import default_03 from '../../src/images/diary_default_03.jpg';
import default_04 from '../../src/images/diary_default_04.jpg';
import DiaryTextarea from '../components/diaryTextarea/diaryTextarea';
import Img from '../components/img/img';
import ShowDate from '../components/showDate/showDate';
import { userLogIn } from '../redux/actions/user_action';
import { diarySet, getKey, publicSet } from '../service/firebase/database';
import { auth } from '../service/firebase/emailLogin';
import { getImgURL, getOtherImgUrl } from '../service/firebase/storage';
import { swalAlert } from '../service/sweetAlert/alert';
import styles from './styles/createDiary.module.css';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';

const CreateDiary = () => {
    const currentUser = useSelector(state => state.user.currentUser, shallowEqual);
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [baseUrl, setBaseUrl] = useState(default_01);
    const [today,] = useState(new Date());
    const [isprivate,setIsprivate] = useState(false);
    const [fileInfo , setFileInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const inputFileRef = useRef(null);
    const txtRef = useRef(null);

    useEffect(()=>{
        if(!currentUser){
            onAuthStateChanged(auth, (onlyUser) => {
                if (onlyUser) {
                  dispatch(userLogIn(onlyUser));
                } else {
                  history.push('/login');
                }
            });
        }    
    },[currentUser]);

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
        setFileInfo(e.target.files[0])
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = function(e) { 
            setBaseUrl(e.target.result)
          }
    }

    const changePrivate = (e) => {
        e.preventDefault();
        setIsprivate(!isprivate)
    }

    const submitDiary = async (e) => {
        e.preventDefault();
        setLoading(true);
        let img = await getImg();
        try{
            let diary = {
                isprivate,
                date : getDate(),
                img,
                txt : txtRef.current.value,
                id : getKey(isPrivatePath()),
                createUser : {
                    uid : currentUser.uid,
                    name : currentUser.displayName,
                    photoURL : currentUser.photoURL,
                }
            }
            if(!txtRef.current.value){
                swalAlert('error','일기전송 오류','일기 본문을 채워주세요.')
                throw new Error();
            }
            if(!isprivate){
                await publicSet(diary, diary.id);
                await diarySet(currentUser.uid, diary, diary.id);
                history.push('/');
            }else{
                await diarySet(currentUser.uid, diary, diary.id);
                history.push('/myDiary');
            }
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
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

    useEffect(()=>{
        return () => setLoading(false);
    })

    const changeTxt = (_changingTxt) => {
        txtRef.current.value = _changingTxt;   
    }


    const getPath = () => {
        if (isprivate) {
          return `/diary/private`;
        } else {
          return `/diary/public`;
        }
      };

    const isPrivatePath = () => {
        if (isprivate){
            return 'diary'
        }else {
            return 'public'
        }
    }

    const getImg = async () => {
        try{
            const initNum = [1,2,3,4];
            let initUrlArr = [];
            initNum.forEach((num)=>{
                let initStr = `default_0${num}`
                initUrlArr.push(initStr); 
            })
            let sliceBaseUrl = baseUrl.slice(20,30)
            if(initUrlArr.includes(sliceBaseUrl)){
                let serverUrl = `diary_${sliceBaseUrl}.jpg`
                let result = await baseGetImg(serverUrl)
                return result 
            }else{
                return otherGetImg()
            }
        }catch(e){
            console.error(e)
        }
    }

    const otherGetImg = async () => {
        let filePath = `${getPath()}/${fileInfo.name}`
        const url = await getOtherImgUrl(filePath,fileInfo);
        return url;
    }

    const baseGetImg = async (_baseUrl) => {
        const url = await getImgURL(`/initUrl/${_baseUrl}`);
        return url;
    }

    const getDate = useCallback(() => {
        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() + 1)).slice(-2);
        let day = ('0' + today.getDate()).slice(-2);
        let weekLabel = today.getDay();
        const weekDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        let todayLabel = weekDay[weekLabel];
    
        let dateString = year + '-' + month  + '-' + day + ' ' + todayLabel;

        return dateString
    },[today])

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
            <form onSubmit={submitDiary}>
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
