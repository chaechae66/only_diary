import { PATH } from "../Routes/path";
import { CurrentUser } from "../types/types";
import { getKey, saveDB } from "../service/firebase/database";
import { swalAlert } from "../service/sweetAlert/alert";

export const getDate = () => {
  const today = new Date();

  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);
  let weekLabel = today.getDay();
  const weekDay = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let todayLabel = weekDay[weekLabel];

  let dateString = year + "-" + month + "-" + day + " " + todayLabel;

  return dateString;
};

export const submitDiary = async (
  _isprivate: boolean,
  _img: string,
  _txt: string,
  _currentUser: CurrentUser,
  _navigate: Function,
  ..._diaryID: string[]
) => {
  const isUpdate = () => {
    const isprivate = _isprivate ? "diary" : "public";
    return !_diaryID[0] ? getKey(isprivate) : _diaryID[0];
  };

  let diary = {
    isprivate: _isprivate,
    date: getDate(),
    img: _img,
    txt: _txt,
    id: isUpdate(),
    createUser: {
      uid: _currentUser.uid,
      name: _currentUser.displayName,
      photoURL: _currentUser.photoURL,
    },
  };

  try {
    if (!_txt) {
      swalAlert("error", "일기전송 오류", "일기 본문을 채워주세요.");
      throw new Error();
    }
    let keyLink = `diary/${_currentUser.uid}`;
    if (!_isprivate) {
      await saveDB(`public/${diary.id}`, diary);
      await saveDB(`${keyLink}/${diary.id}/`, diary);
      _navigate(`${PATH.BASE}`);
    } else {
      await saveDB(`${keyLink}/${diary.id}`, diary);
      _navigate(`/${_currentUser.uid}`);
    }
  } catch (err) {
    console.log("err", err);
  }
};
