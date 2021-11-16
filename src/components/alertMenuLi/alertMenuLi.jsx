import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getValues, removeLikeyEvent } from '../../service/firebase/database';
import moment from 'moment';
import styles from './alertMenuLi.module.css';
import { Link } from 'react-router-dom';

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

    const removeEvent = async (e,_event) => {
        e.preventDefault();
        await removeLikeyEvent(currentUser.uid,_event.diaryId);
        const event = await getValues('event',currentUser.uid);
        setEvents(event);
    }

    console.log('1');

    return (
        <>
            {
                events?.map((event)=>{
                    return(
                        <li 
                            className={styles.eventLi} 
                            key={event.diaryId + event.likeyUser.uid}
                            onClick={(e)=>{removeEvent(e,event)}}
                        >
                            <Link 
                                to={{ pathname : `/publicCardPage/${event.diaryId}`}}>
                                <div>
                                    {event.likeyUser.name}님이 회원님의 다이어리에 좋아요를 눌렀습니다!<br />
                                    <span className={styles.timeStamp}>{moment(event.timeStamp).fromNow()}</span>
                                </div>
                            </Link>
                        </li>
                    )
                })
            }
        </>
        )
    }
)

export default AlertMenuLi
