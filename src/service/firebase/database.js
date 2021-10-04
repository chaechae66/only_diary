import app from "./firebaseApp";
import { getDatabase, ref, set } from "firebase/database";

const db = getDatabase(app);

export function writeUserData(_userUid, _name, _photoURL) {
  set(ref(db, "users/" + _userUid), {
    name: _name,
    photoURL: _photoURL,
  });
}