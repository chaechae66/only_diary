import React, { useEffect } from 'react'
import { useParams } from 'react-router';

const PublicCardPage = () => {

    const {id} = useParams();

    useEffect(()=>{
        handlePrivateDiary();
    },[])

    const handlePrivateDiary = () => {}

    return (
        <div>
            publicCardPage
        </div>
    )
}

export default PublicCardPage
