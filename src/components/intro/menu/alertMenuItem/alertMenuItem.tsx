import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import styles from "./alertMenuItem.module.css";
import { Link } from "react-router-dom";
import { getValues, removeDB } from "../../../../service/firebase/database";
import { RootState } from "../../../../store";
import { EventType } from "../../../../types/types";
import { PATH } from "../../../../Routes/path";

const AlertMenuItem = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const [events, setEvents] = useState<EventType[] | null>(null)

  useEffect(()=>{
    const fetch = async () => {
      const fetchEvent : EventType[] = await getValues("event", currentUser.uid);
      setEvents(fetchEvent);
    }

    fetch();
  },[currentUser.uid])

  const removeEvent = async (
    e: React.MouseEvent<HTMLElement>,
    _event: EventType
  ) => {
    e.preventDefault();
    await removeDB(`event/${currentUser.uid}/${_event.diaryId}`);
    const updateEvent : EventType[] = await getValues("event", currentUser.uid);
    setEvents(updateEvent);
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
};

export default AlertMenuItem;
