import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { removeUserFromFeed } from '../utils/feedSlice';
import { useSwipeable } from 'react-swipeable';
import { toast } from 'react-toastify';

const UserCard = ({ _id, firstName, lastName, age, gender, photoUrl, about }) => {
    const dispatch = useDispatch();

    const handleSendRequest = async (status, _id) => {
        try {
            await axios.post(`${BASE_URL}request/send/${status}/${_id}`, {}, { withCredentials: true });
            dispatch(removeUserFromFeed(_id));
        } catch (error) {
            toast.error(error)
        }
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => handleSendRequest("ignored", _id),
        onSwipedRight: () => handleSendRequest("interested", _id),
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    return (
        <div className="flex flex-col items-center">
            <div {...handlers}
                className="card bg-base-200 text-base-content shadow-xl rounded-2xl overflow-hidden w-full md:w-96 mx-auto mt-10 transition-transform transform hover:scale-[1.02] duration-200">
                <figure className="h-96 w-full overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        src={photoUrl}
                        alt={`${firstName} ${lastName}`}
                    />
                </figure>
                <div className="card-body p-5">
                    <h2 className="text-xl font-semibold">{`${firstName} ${lastName}`}</h2>
                    <p className="text-sm opacity-70 mb-1">{age} yrs, {gender}</p>
                    <p className="text-sm opacity-80">{about}</p>

                    <div className="card-actions flex justify-between mt-6">
                        <button
                            className="btn btn-sm md:btn-md bg-neutral text-white hover:bg-neutral-focus border-none"
                            onClick={() => handleSendRequest("ignored", _id)}
                        >
                            Ignore
                        </button>
                        <button
                            className="btn btn-sm md:btn-md bg-pink-600 text-white hover:bg-pink-700 border-none"
                            onClick={() => handleSendRequest("interested", _id)}
                        >
                            Interested
                        </button>
                    </div>
                </div>
            </div>

            <p className="text-center text-sm text-gray-400 mt-5">
                Swipe right to accept, left to reject
            </p>
        </div>
    );
};

export default UserCard;
