import app from "./firebaseApp";
import { getDatabase, ref, set, onValue, push , child, get, remove, serverTimestamp, Database } from "firebase/database";

export const db : Database = getDatabase(app);

export {
  set,
  ref,
}

export const getValues = <R>(_ref:string, ..._uid:string[]) : Promise<R[]> => {
  return new Promise((res : (value : R[]) => void, rej) => {
    onValue(ref(db, "/" + _ref + "/" + _uid), (snapshot) => {
      let valuesAry : Array<R>  = [];
      snapshot.forEach((childSnapshot) => {
        valuesAry.push(childSnapshot.val());
      });
      const reverse = [...valuesAry].reverse();
      res(reverse);
    });
  })
};

export const getOneVal = (_refURL:string) => {
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

export function getKey(_ref:string) {
  return push(child(ref(db), _ref)).key
}

export function saveDB(_ref:string,_data:object|string){
  return set(ref(db, _ref), _data);
}

export function removeDB(_ref:string){
  const currentRef = ref(db,_ref);
  return remove(currentRef);
}

export const getLikeyValues = (_userUid:string) => {
  return new Promise((resolve, reject) => {
    onValue(ref(db, "/users/" + _userUid + "/likeyDiary"), (snapshot) => {
      const data = snapshot.val();
      if(data){
        resolve(Object.keys(data));
      }
    });
  });
};

export const getLikeyLength = (_diaryId:string) => {
  return new Promise((resolve, reject) => {
    onValue(ref(db, "/likey/" +_diaryId), (snapshot) => {
      resolve(snapshot.size);
    });
  });
}

export const timeStamp = serverTimestamp();