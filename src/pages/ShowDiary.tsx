import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import Diary from '../components/writeDairy/Diary/Diary';
import { PATH } from '../Routes/path';
import { getOneVal } from '../service/firebase/database';
import { swalAlert } from '../service/sweetAlert/alert';
import { RootState } from '../store';
import Page404 from './Page404';

const ShowDiary = () => {
    const params = useParams();
    const [diary, setDiary] = useState(null);
    const [error,setError] = useState(false);
    const currentUser = useSelector((state: RootState) => state.user.currentUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!params.uid){
            return;
        }
        if (params.uid !== currentUser?.user_seqno) {
            swalAlert("warning", "잘못된 접근", "올바른 접근이 아닙니다.");
            navigate(`${PATH.BASE}`);
        }
    }, [params, currentUser?.user_seqno, navigate]);

    useEffect(()=>{
        const handlePrivateDiary = async () => {
            try{
                const diaryPath = !params.uid ? `public/${params.id}` : `diary/${currentUser?.user_seqno}/${params.id}`;
                const diaryData = await getOneVal(diaryPath);
                setDiary(diaryData);
            }catch(err){
                console.log('err',err);
                err && setError(true);
            }
        }

        handlePrivateDiary();
    },[params,currentUser?.user_seqno])
    
    return (
        <>
            {
                error ? <Page404 />
                : <Diary diary={diary}/>
            }
        </>
    )
}

export default ShowDiary
