import { FetchData } from './../../types/types.d';
import { useCallback, useEffect, useState } from 'react'
import { getValues } from '../service/firebase/database';
    
function useFetch(_ref : string, ..._id:string[]) {
    const [diary, setDiary] = useState<FetchData | null>(null);

    const fetchDiarys = useCallback(async () => {
        try{
            let diaryData:FetchData = await getValues(_ref, _id);
            setDiary(diaryData);
        }catch(e){
            console.log(e);
        }
    },[_ref,_id])
    useEffect(()=>{
        !diary && fetchDiarys();
    },[diary,fetchDiarys])

    return diary
}

export default useFetch