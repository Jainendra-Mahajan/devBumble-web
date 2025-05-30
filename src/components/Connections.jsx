import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addConnection } from '../utils/connectionSlice';

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection);

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "user/requests/connections", { withCredentials: true });
            dispatch(addConnection(res?.data?.data));
        } catch (error) {
            console.log(error);
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
                        <li key={_id} className="flex items-center gap-4 bg-base-300 p-4 rounded-lg hover:bg-base-100 transition">
                            <img
                                className="w-14 h-14 object-cover rounded-full border border-gray-600"
                                src={photoUrl}
                                alt="Profile"
                            />
                            <div>
                                <h3 className="text-md font-semibold text-white">{firstName} {lastName}</h3>
                                <p className="text-sm text-gray-400">{age} yrs, {gender}</p>
                                <p className="text-xs text-gray-500 mt-1">{about}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Connections;
