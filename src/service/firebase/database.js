import app from "./firebaseApp";
import { getDatabase, ref, set, onValue } from "firebase/database";

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
