import app from "./firebaseApp";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage(app);

export const getImgURL = (_link) => {
  return new Promise((res,rej) => {
    res(getDownloadURL(ref(storage,_link)))
  })
}