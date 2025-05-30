import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'

const Requests = () => {
    const dispatch = useDispatch();
    const connectionRequests = useSelector((store) => store.request);

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "user/requests/received", { withCredentials: true });
            dispatch(addRequest(res?.data?.data));
        } catch (err) {
            console.log(err);
        }
    }

    const handleRequest = async (status, _id) => {
        try {
            await axios.post(BASE_URL + `request/review/${status}/${_id}`, {}, { withCredentials: true });
            dispatch(removeRequest(_id));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!connectionRequests || connectionRequests.length === 0) {
        return <h2 className="text-center mt-10 text-gray-400 text-lg">No Connection Requests</h2>;
    }

    return (
        <div className="bg-base-200 shadow-lg rounded-xl p-6 max-w-2xl mx-auto mt-10">
            <h2 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">Connection Requests</h2>
            <ul className="space-y-4">
                {connectionRequests.map((request) => {
                    const { firstName, lastName, age, photoUrl, about, gender } = request?.fromUserId;

                    return (
                        <li key={request._id} className="flex items-center justify-between bg-base-300 p-4 rounded-lg hover:bg-base-100 transition">
                            <div className="flex items-center gap-4">
                                <img src={photoUrl} alt="Profile" className="w-14 h-14 object-cover rounded-full border border-gray-600" />
                                <div>
                                    <h3 className="text-md font-semibold text-white">{firstName} {lastName}</h3>
                                    <p className="text-sm text-gray-400">{age} yrs, {gender}</p>
                                    <p className="text-xs text-gray-500 mt-1">{about}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="btn bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                                    onClick={() => handleRequest("accepted", request._id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="btn bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                                    onClick={() => handleRequest("rejected", request._id)}
                                >
                                    Reject
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Requests;
