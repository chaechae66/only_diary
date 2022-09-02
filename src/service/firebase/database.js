import app from "./firebaseApp";
import { getDatabase, ref, set, onValue, push , child, get, remove, serverTimestamp } from "firebase/database";

export const db = getDatabase(app);

export {
  set,
  ref,
}

export const getValues = (_ref, ..._uid) => {
  return new Promise ((res, rej) => {onValue(ref(db, "/" + _ref + "/" + _uid), (snapshot) => {
      let valuesAry = [];
      snapshot.forEach((childSnapshot) => {
        valuesAry.push(childSnapshot.val());
      });
      const reverse = [...valuesAry].reverse();
      res(reverse);
  });
  })
};

export const getOneVal = (_refURL) => {
  return new Promise((res,rej)=>{
    const dbRef = ref(db);
    get(child(dbRef, _refURL)).then((snapshot) => {
      if (snapshot.exists()) {
        res(snapshot.val())
      }else{
        rej(new Error('일치하는 일기가 없습니다.'))
      }
    })
  })
}

export function getKey(_ref) {
  return push(child(ref(db), _ref)).key
}

export function dataSet(_ref,_data, _keyLink){
  return set(ref(db, _ref +"/" + _keyLink ), _data);
}

export function writeLikey(_diaryId, _likeyUserUid, _data) {
  return set(ref(db,"likey/" + _diaryId +"/"+ _likeyUserUid),_data);
}

export function updateUserLikey(_userUid, _diaryId){
  const postListRef = ref(db, `users/${_userUid}/likeyDiary/${_diaryId}`);
  return set(postListRef,{
    diaryId : _diaryId
  });
}

export function writeLikeyEvent(_madeUser, _diaryId, _data) {
  return set(ref(db,"event/" + _madeUser +'/'+ _diaryId),_data);
}

export function removeLikeyEvent(_madeUser, _diaryId){
  const eventRef = ref(db,"event/" + _madeUser +"/"+ _diaryId);
  return remove(eventRef);
}

export function removeLikey(_diaryId, _likeyUserUid){
  const likeyRef = ref(db,"likey/" + _diaryId +"/"+ _likeyUserUid);
  return remove(likeyRef);
}

export function removeUserLikey(_diaryId, _likeyUserUid){
  const likeyRef = ref(db, `users/${_likeyUserUid}/likeyDiary/${_diaryId}`);
  return remove(likeyRef);
}

export const getLikeyValues = (_userUid) => {
  return new Promise((resolve, reject) => {
    onValue(ref(db, "/users/" + _userUid + "/likeyDiary"), (snapshot) => {
      const data = snapshot.val();
      if(data){
        resolve(Object.keys(data));
      }
    });
  });
};

export const getLikeyLength = (_diaryId) => {
  return new Promise((resolve, reject) => {
    onValue(ref(db, "/likey/" +_diaryId), (snapshot) => {
      resolve(snapshot.size);
    });
  });
}

export const timeStamp = serverTimestamp(db);