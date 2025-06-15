import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"

const Feed = () => {
    const userFeedData = useSelector((store) => store.feed);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchFeed = async () => {
        if (userFeedData && userFeedData.length > 0) return;

        try {
            const res = await axios.get(BASE_URL + 'feed', { withCredentials: true });
            dispatch(addFeed(res?.data?.data));
        } catch (err) {
            if (err?.response?.status === 400) {
                navigate('/login');
            } else {
                toast.error(err);
            }
        }
    };

    useEffect(() => {
        fetchFeed();
    }, []);

    if (!userFeedData || userFeedData.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <h2 className="text-lg text-gray-400">No Developers Available with this Filter</h2>
            </div>
        );
    }

    return (
        <div className="flex justify-center mt-10">
            <UserCard
                _id={userFeedData[0]._id}
                firstName={userFeedData[0].firstName}
                lastName={userFeedData[0].lastName}
                age={userFeedData[0].age}
                gender={userFeedData[0].gender}
                photoUrl={userFeedData[0].photoUrl}
                about={userFeedData[0].about}
            />
        </div>
    );
};

export default Feed;
