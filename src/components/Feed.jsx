import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'
import { useNavigate } from 'react-router'

const Feed = () => {

    const userFeedData = useSelector((store) => store.feed)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchFeed = async () => {
        if (userFeedData) return;
        try {
            const res = await axios.get(BASE_URL + "feed", { withCredentials: true });
            dispatch(addFeed(res?.data?.data));
        }
        catch (err) {
            if (err.status === 400) {
                return navigate("/login")
            }
        }
    }

    useEffect(() => {
        fetchFeed();
    }, [])


    if (!userFeedData || userFeedData.length === 0) {
        return <h1 className='my-10 text-center'>No Devevlopers Available with this filter</h1>
    }

    return (
        <div>
            {userFeedData && <UserCard firstName={userFeedData[0].firstName} lastName={userFeedData[0].lastName} age={userFeedData[0].age} gender={userFeedData[0].gender}
                photoUrl={userFeedData[0].photoUrl} about={userFeedData[0].about} />}
        </div>
    )
}

export default Feed