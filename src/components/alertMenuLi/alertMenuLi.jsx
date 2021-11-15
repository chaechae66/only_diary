import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getValues } from '../../service/firebase/database';
import moment from 'moment';
import styles from './alertMenuLi.module.css';

const AlertMenuLi = React.memo(() => {
    const currentUser = useSelector(state => state.user.currentUser);

    const [events, setEvents] = useState(null);

    useEffect(() => {
        currentUser && handleEvent();
    }, []);

    const handleEvent = async () => {
        const event = await getValues('event',currentUser.uid);
        setEvents(event);
    }

    console.log('events',events);

    return (
        <>
            {
                events?.map((event)=>{
                    return(
                        <li className={styles.eventLi} key={event.diaryId + event.likeyUser.uid}>
                            <div>
                                {event.likeyUser.name}님이 회원님의 다이어리에 좋아요를 눌렀습니다!<br />
                                <span className={styles.timeStamp}>{moment(event.timeStamp).fromNow()}</span>
                            </div>
                        </li>
                    )
                })
            }
        </>
        )
    }
)

export default AlertMenuLi
