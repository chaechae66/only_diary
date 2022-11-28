import React from "react";
import { useNavigate } from "react-router";
import { PATH } from "../../../Routes/path";
import styles from "./NoDiary.module.css";

const NoDiary = () => {
  const navigate = useNavigate();

  const goToWriteDiary = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate(`${PATH.CREATE}`);
  };
  return (
    <div className={styles.wrap}>
      <span className={styles.noDiaryTxt}>등록된 일기가 없습니다.</span>
      <button onClick={goToWriteDiary} className={styles.createDiaryBtn}>
        일기 추가
      </button>
    </div>
  );
};

export default NoDiary;
