import { DiaryElem, EventType } from './../../types/types.d';
import { useCallback, useEffect, useState } from 'react'
import { getValues } from '../service/firebase/database';
    
function useFetch<D>(_ref : string, ..._id: string[]) : D {
    const [diary, setDiary] = useState<D>(null);
    const [ _uid ] = _id

    const fetchDiarys = useCallback(async () => {
        try{
            let diaryData: D = await getValues(_ref, _uid);
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