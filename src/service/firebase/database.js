import app from "./firebaseApp";
import { getDatabase, ref, set, onValue, push , child, get, remove, serverTimestamp } from "firebase/database";

const db = getDatabase(app);

export function writeUserData(_userUid, _name, _photoURL) {
  set(ref(db, "users/" + _userUid), {
    name: _name,
    photoURL: _photoURL,
  });
}

export const getValues = (_ref, ..._uid) => {
  return new Promise((resolve, reject) => {
    onValue(ref(db, "/" + _ref + "/" + _uid), (snapshot) => {
      let valuesAry = [];
      snapshot.forEach((childSnapshot) => {
        valuesAry.push(childSnapshot.val());
      });
      const reverse = [...valuesAry].reverse();
      return resolve(reverse);
    });
  });
};

export const getOnePublicValue = (_id) => {
  return new Promise((res,rej)=>{
    const dbRef = ref(db);
    get(child(dbRef, `public/${_id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        return res(snapshot.val())
      }
    })
  })
}

export const getOnePrivateValue = (_uid,_id) => {
  return new Promise((res,rej)=>{
    const dbRef = ref(db);
    get(child(dbRef, `diary/${_uid}/${_id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        return res(snapshot.val())
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