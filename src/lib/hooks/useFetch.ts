import { useCallback, useEffect, useState } from 'react'
import { getValues } from '../service/firebase/database';
    
function useFetch<R>(_ref : string, ..._id: string[]) : R {
    const [diary, setDiary] = useState<R | null>(null);
    const [ _uid ] = _id

    const fetchDiarys = useCallback(async () : Promise<void> => {
        try{
            let diaryData: R | [] = await getValues<R>(_ref, _uid);
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