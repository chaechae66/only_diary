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

export function saveDB(_ref,_data){
  return set(ref(db, _ref), _data);
}

export function removeDB(_ref){
  const currentRef = ref(db,_ref);
  return remove(currentRef);
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