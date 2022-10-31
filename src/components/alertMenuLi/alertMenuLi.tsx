import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import styles from "./alertMenuLi.module.css";
import { Link } from "react-router-dom";
import { getValues, removeDB } from "../../lib/service/firebase/database";
import { RootState } from "../../store";
import { EventType } from "../../types/types";
import { PATH } from "../../Routes/path";

const AlertMenuLi = React.memo(() => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const [events, setEvents] = useState(null);

  const handleEvent = useCallback(async () => {
    const event = await getValues("event", currentUser.uid);
    setEvents(event);
  }, [currentUser]);

  useEffect(() => {
    currentUser && handleEvent();
  }, [currentUser, handleEvent]);

  const removeEvent = async (
    e: React.MouseEvent<HTMLElement>,
    _event: EventType
  ) => {
    e.preventDefault();
    await removeDB(`event/${currentUser.uid}/${_event.diaryId}`);
    const event = await getValues("event", currentUser.uid);
    setEvents(event);
  };

  return (
    <>
      {events?.map((event: EventType) => {
        return (
          <li
            className={styles.eventLi}
            key={event.diaryId + event.likeyUser.uid}
            onClick={(e) => {
              removeEvent(e, event);
            }}
          >
            <Link to={{ pathname: `${PATH.PUBLIC}/${event.diaryId}` }}>
              <div>
                {event.likeyUser.name}님이 회원님의 다이어리에 좋아요를
                눌렀습니다!
                <br />
                <span className={styles.timeStamp}>
                  {moment(event.timeStamp).fromNow()}
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </>
  );
});

export default AlertMenuLi;
