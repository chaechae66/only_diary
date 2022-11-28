import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Diary from "../components/writeDairy/Diary/Diary";
import { getOneVal } from "../service/firebase/database";
import { swalAlert } from "../service/sweetAlert/alert";
import { PATH } from "../Routes/path";
import { RootState } from "../store";
import Page404 from "./Page404";

const PrivateDiary = () => {
  const { uid, id } = useParams();
  const [diary, setDiary] = useState(null);
  const [error, setError] = useState(false);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (uid !== currentUser.uid) {
      swalAlert("warning", "잘못된 접근", "올바른 접근이 아닙니다.");
      navigate(`${PATH.BASE}`);
    }
  }, [uid, currentUser.uid, navigate]);

  const handlePrivateDiary = useCallback(async () => {
    try {
      const diaryInfo = await getOneVal(`diary/${currentUser?.uid}/${id}`);
      setDiary(diaryInfo);
    } catch (err) {
      console.log("err", err);
      err && setError(true);
    }
  }, [currentUser, id]);

  useEffect(() => {
    handlePrivateDiary();
  }, [handlePrivateDiary]);

  useEffect(() => {
    if (!currentUser) {
      navigate(`${PATH.LOGIN}`);
    }
  }, [currentUser, navigate]);

  return <div>{error ? <Page404 /> : <Diary diary={diary} />}</div>;
};

export default PrivateDiary;
