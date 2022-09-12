import { DiaryElem } from './../../types/types.d';
import { useCallback, useEffect, useState } from 'react'
import { getValues } from '../service/firebase/database';
    
function useFetch(_ref : string, ..._id:string[]) {
    const [diary, setDiary] = useState< DiaryElem[] | null>(null);
    const [ _uid ] = _id

    const fetchDiarys = useCallback(async () => {
        try{
            let diaryData = await getValues(_ref, _uid);
            setDiary(diaryData);
        }catch(e){
            console.log(e);
        }
    },[_ref,_uid])
    useEffect(()=>{
        !diary && fetchDiarys();
    },[diary,fetchDiarys])

    return diary
}

export default useFetch