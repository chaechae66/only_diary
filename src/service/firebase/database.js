import app from "./firebaseApp";
import { getDatabase, ref, set, onValue, push , child } from "firebase/database";

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

export function getKey(_ref) {
  return push(child(ref(db), "public")).key
}

export function publicSet(_data,_key) {
  return set(ref(db, "public/" + _key ), _data);
}

export function diarySet(_uid, _data,_key) {
  return set(ref(db, "diary/" + _uid + "/"+ _key), _data);
}
