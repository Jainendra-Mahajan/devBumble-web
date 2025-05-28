import React from 'react'

const UserCard = ({ firstName, lastName, age, gender, photoUrl, about }) => {


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
                    <button className="btn btn-primary ">Ignore</button>
                    <button className="btn btn-primary bg-pink-500">Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard