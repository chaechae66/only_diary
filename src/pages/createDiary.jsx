import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import default_01 from '../../src/images/diary_default_01.jpg';
import default_02 from '../../src/images/diary_default_02.jpg';
import default_03 from '../../src/images/diary_default_03.jpg';
import default_04 from '../../src/images/diary_default_04.jpg';
import { diarySet, getKey, publicSet } from '../service/firebase/database';
import { getImgURL, getOtherImgUrl } from '../service/firebase/storage';
import styles from './styles/createDiary.module.css';

const CreateDiary = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const history = useHistory();

    const [baseUrl, setBaseUrl] = useState(default_01);
    const [txt, setTxt] = useState('');
    const [today,] = useState(new Date());
    const [isprivate,setIsprivate] = useState(false);
    const [fileInfo , setFileInfo] = useState(null);

    const inputFileRef = useRef(null);
    const txtRef = useRef(null);

    useEffect(()=>{
        if(!currentUser){
            history.push('/login')
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
        setFileInfo(e.target.files[0])
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = function(e) { 
            setBaseUrl(e.target.result)
          }
    }

    const changeTxt = (e) => {
        e.preventDefault();
        let currentTxt = e.target.value; 
        setTxt(currentTxt);
    }

    const changePrivate = (e) => {
        e.preventDefault();
        setIsprivate(!isprivate)
    }

    const handleResizeHeight = useCallback(() => {
        if (txtRef === null || txtRef.current === null) {
          return;
        }
        txtRef.current.style.height = 'auto';
        txtRef.current.style.height = txtRef.current.scrollHeight + 'px';
      }, [txtRef]);

    const submitDiary = async (e) => {
        e.preventDefault();
        let img = await getImg();
        try{
            let diary = {
                isprivate,
                date : getDate(),
                img,
                txt,
                id : getKey(isPrivatePath()),
                createUser : {
                    uid : currentUser.uid,
                    name : currentUser.displayName,
                    photoURL : currentUser.photoURL,
                }
            }
            if(!isprivate){
                await publicSet(diary, diary.id);
                await diarySet(currentUser.uid, diary, diary.id);
                history.push('/');
            }else{
                await diarySet(currentUser.uid, diary, diary.id);
            }
        }catch(e){
            console.error(e)
        }finally{
            setBaseUrl('default_01')
        }
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
            console.log('trueOrFalse',initUrlArr.includes(baseUrl));
            console.log('initUrlArr',initUrlArr)
            let sliceBaseUrl = baseUrl.slice(20,30)
            if(initUrlArr.includes(sliceBaseUrl)){
                let serverUrl = `diary_${sliceBaseUrl}.jpg`
                console.log('serverUrl',serverUrl)
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
            <div style={{backgroundImage:`url(${baseUrl})`}} className={styles.diaryImg}></div>
            <div className={styles.option}>
                <span>{getDate()}</span>
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
                    <textarea placeholder="당신의 이야기를 적어주세요" onChange={changeTxt} className={styles.inputTxt} ref={txtRef} onInput={handleResizeHeight}/>
                </div>
                <button className={styles.upload} type="submit">일기업로드</button>
            </form>
        </section>
    )
}

export default CreateDiary
