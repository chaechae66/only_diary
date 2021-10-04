import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
  } from "firebase/auth";
import app from "./firebaseApp";
  
export const auth = getAuth(app);
  
  //유저 생성
export const createdUser = (_email, _password) => {
    return createUserWithEmailAndPassword(auth, _email, _password);
};

  //유저 정보 업데이트
export const updateUserInfo = (_name, _url) => {
    return updateProfile(auth.currentUser, {
        displayName: _name,
        photoURL: _url,
    });
};