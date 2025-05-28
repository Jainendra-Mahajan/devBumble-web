import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addConnection } from '../utils/connectionSlice'

const Connections = () => {

    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection);

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "user/requests/connections", { withCredentials: true });
            dispatch(addConnection(res?.data?.data))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, [])
    if (!connections) {
        return <h1>No Connection Requests</h1>
    }

    return (
        <ul className="list bg-base-100 rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">My Connections</li>
            {
                connections.map((connection) => {
                    const { firstName, lastName, age, photoUrl, about, gender } = connection;

                    return <li className="list-row" key={connection?._id}>
                        <div><img className="size-10 rounded-box" src={photoUrl} /></div>
                        <div>
                            <div >{firstName + " " + lastName}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">{age + ", " + gender}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">{about}</div>
                        </div>

                    </li>
                })
            }

        </ul>
    )
}

export default Connections