import app from "./firebaseApp";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export const storage = getStorage(app);

export {
  getDownloadURL,
  ref,
}

export const getImgURL = (_link) => {
  return new Promise((res,rej) => {
    res(getDownloadURL(ref(storage,_link)))
  })
}

export const getOtherImgUrl = (_link,_file) => {
  return new Promise((res,rej)=> {
    const storageRef = ref(storage, _link);
    const uploadTask = uploadBytesResumable(storageRef, _file);

    uploadTask.on('state_changed', 
      (snapshot) => {}, 
      (err) => {
        console.error(err)
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          res(downloadURL)
        });
      }
    );
  })
}