import { convertDate } from "./convertDate";
import { PATH } from "../Routes/path";
import type { CurrentUser } from "../types/types";
import { getKey, saveDB } from "../service/firebase/database";
import { swalAlert } from "../service/sweetAlert/alert";

export const submitDiary = async ({
  isprivate,
  img,
  txt,
  currentUser,
  navigate,
  diaryID
  }:{
    isprivate : boolean,
    img: string,
    txt :string,
    currentUser : CurrentUser,
    navigate : Function, 
    diaryID : string | null
  }
) => {
  const isUpdate = () => {
    const path = isprivate ? "diary" : "public";
    return !diaryID ? getKey(path) : diaryID;
  };

  let diary = {
    isprivate,
    date: convertDate(),
    img,
    txt,
    id: isUpdate(),
    createUser: {
      uid: currentUser.uid,
      name: currentUser.displayName,
      photoURL: currentUser.photoURL,
    },
  };

  try {
    if (!txt) {
      swalAlert("error", "일기전송 오류", "일기 본문을 채워주세요.");
      throw new Error();
    }
    let keyLink = `diary/${currentUser.uid}`;
    if (!isprivate) {
      await saveDB(`public/${diary.id}`, diary);
      await saveDB(`${keyLink}/${diary.id}/`, diary);
      navigate(`${PATH.BASE}`);
    } else {
      await saveDB(`${keyLink}/${diary.id}`, diary);
      navigate(`/${currentUser.uid}`);
    }
  } catch (e) {
    const result = (e as Error).message;
    swalAlert("warning", "서버 오류", result);
  }
};
