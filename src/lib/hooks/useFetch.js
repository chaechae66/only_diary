import { useCallback, useEffect, useState } from 'react'
import { getValues } from '../service/firebase/database';

function useFetch(_ref, ..._id) {
    const [diary, setDiary] = useState(null);

    const fetchDiarys = useCallback(async () => {
        try{
            let diaryData = await getValues(_ref, _id);
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