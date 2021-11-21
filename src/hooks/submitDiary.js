import { dataSet, getKey } from "../service/firebase/database";
import { swalAlert } from "../service/sweetAlert/alert";

export const getDate = () => {
    const today = new Date();

    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let weekLabel = today.getDay();
    const weekDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    let todayLabel = weekDay[weekLabel];

    let dateString = year + '-' + month  + '-' + day + ' ' + todayLabel;

    return dateString
}

export const submitDiary = async (_setLoading,_isprivate,_img,_txtRef,_currentUser,_history) => {
    const isPrivatePath = () => {
        if (_isprivate){
            return 'diary'
        }else {
            return 'public'
        }
    }

    _setLoading(true);
    let diary = {
        isprivate : _isprivate,
        date : getDate(),
        img : _img,
        txt : _txtRef.current.value,
        id : getKey(isPrivatePath()),
        createUser : {
            uid : _currentUser.uid,
            name : _currentUser.displayName,
            photoURL : _currentUser.photoURL,
        }
    }
    try{
        if(!_txtRef.current.value){
            swalAlert('error','일기전송 오류','일기 본문을 채워주세요.');
            _setLoading(false);
            throw new Error();
        }
        let keyLink = `diary/${_currentUser.uid}`
        if(!_isprivate){
            await dataSet('public', diary, diary.id);
            await dataSet(keyLink, diary, diary.id);
            _setLoading(false);
            _history.push('/');
        }else{
            await dataSet(keyLink, diary, diary.id);
            _setLoading(false);
            _history.push('/myDiary');
        }
    }catch(err){
        console.log('err',err);
    }
}