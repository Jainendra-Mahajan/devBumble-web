import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ _id, firstName, lastName, age, gender, photoUrl, about }) => {

    const dispatch = useDispatch();

    const handlesendRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + `request/send/${status}/${_id}`, {}, { withCredentials: true });
            dispatch(removeUserFromFeed(_id));
        } catch (error) {
            console.log(error);
        }
    }


    return (

        <div className="card bg-base-300 w-96 shadow-sm mx-auto my-20">
            <figure>
                <img
                    className='w-96'
                    src={photoUrl}

                    alt="Profile"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>{age + " Yrs, " + gender}</p>
                <p>{about}</p>
                <div className="card-actions justify-between my-5">
                    <button className="btn btn-primary" onClick={() => handlesendRequest("ignored", _id)}>Ignore</button>
                    <button className="btn btn-primary bg-pink-500" onClick={() => handlesendRequest("interested", _id)}>Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard