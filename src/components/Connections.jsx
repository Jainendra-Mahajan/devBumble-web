import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addConnection } from '../utils/connectionSlice';
import { Link } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection);

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "user/requests/connections", { withCredentials: true });
            dispatch(addConnection(res?.data?.data));
        } catch (error) {
            toast.error("Failed to fetch connections. Please try again later.");
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections || connections.length === 0) {
        return <h2 className="text-center mt-10 text-gray-400 text-lg">No Connections Found</h2>;
    }

    return (
        <div className="bg-base-200 shadow-lg rounded-xl p-6 max-w-2xl mx-auto mt-10">
            <h2 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">My Connections</h2>
            <ul className="space-y-4">
                {connections.map((connection) => {
                    const { _id, firstName, lastName, age, photoUrl, about, gender } = connection;

                    return (
                        <li key={_id} className="flex items-center justify-between gap-4 bg-base-300 p-4 rounded-lg hover:bg-base-100 transition">
                            <div className='flex items-center'>
                                <img
                                    className="w-14 h-14 object-cover rounded-full border border-gray-600"
                                    src={photoUrl}
                                    alt="Profile"
                                />
                                <div className='mx-5'>
                                    <h3 className="text-md font-semibold text-white">{firstName} {lastName}</h3>
                                    <p className="text-sm text-gray-400">{age} yrs, {gender}</p>
                                    <p className="text-xs text-gray-500 mt-1">{about}</p>
                                </div>
                            </div>

                            <Link to={`/chat/${_id}`} ><button className='btn'>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.78 9.78 0 0 1-4.37-1L3 21l1.36-3.64A7.94 7.94 0 0 1 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                </svg>

                            </button> </Link >
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Connections;
