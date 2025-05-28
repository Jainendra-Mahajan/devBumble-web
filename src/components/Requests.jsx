import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'

const Requests = () => {
    const dispatch = useDispatch();
    const connectionRequests = useSelector((store) => store.request);
    console.log(connectionRequests);

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
            const res = await axios.post(BASE_URL + `request/review/${status}/${_id}`, {}, { withCredentials: true });
            dispatch(removeRequest(_id));
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!connectionRequests) {
        return <h1>No Connection Requests</h1>
    }

    return (
        <ul className="list bg-base-100 rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Connection Requests</li>
            {
                connectionRequests && connectionRequests.map((request) => {

                    const { firstName, lastName, age, photoUrl, about, gender } = request?.fromUserId;

                    return <li className="list-row" key={request?._id}>
                        <div><img className="size-10 rounded-box" src={photoUrl} /></div>
                        <div>
                            <div >{firstName + " " + lastName}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">{age + ", " + gender}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">{about}</div>
                        </div>
                        <button className="btn btn-soft btn-success" onClick={() => handleRequest("accepted", request?._id)}>Accept</button>
                        <button className="btn btn-soft btn-error" onClick={() => handleRequest("rejected", request?._id)}>Reject</button>
                    </li>
                })
            }

        </ul>
    )
}

export default Requests