import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
  } from "firebase/auth";
import app from "./firebaseApp";
  
export const auth = getAuth(app);

export {
  createUserWithEmailAndPassword, //유저 생성
  updateProfile, //유저 정보 업데이트
  signInWithEmailAndPassword, //유저 로그인
}