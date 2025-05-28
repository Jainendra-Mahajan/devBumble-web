import React, { useState } from 'react'
import UserCard from './UserCard';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from "../utils/userSlice"

const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [age, setAge] = useState(user.age)
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [about, setAbout] = useState(user.about)
    const [gender, setGender] = useState(user.gender)
    const [showToast, setShowToast] = useState(false)
    const [error, setError] = useState("")
    const dispatch = useDispatch()


    const saveProfile = async () => {
        try {
            setError("");
            const res = await axios.patch(BASE_URL + "profile/edit", {
                firstName,
                lastName,
                age,
                photoUrl,
                about
            }, { withCredentials: true });


            dispatch(addUser(res?.data?.data));
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000)
        }
        catch (err) {
            console.log(err);
            setError(err.response.data);
        }
    }
    return (
        <div className='flex justify-center gap-10'>
            <div className='flex justify-center my-10'>
                <div className="card card-dash bg-base-200 w-96 mx-auto my-10">
                    <div className="card-body">
                        <h2 className="card-title mx-auto">Edit Profile</h2>


                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">First Name</legend>
                            <input type="text" className="input" placeholder="Type here" value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Last Name</legend>
                            <input type="text" className="input" placeholder="Type here" value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">age</legend>
                            <input type="text" className="input" placeholder="Type here" value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Photo Url</legend>
                            <input type="text" className="input" placeholder="Type here" value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                            />
                        </fieldset>

                        <legend className="fieldset-legend">Photo Url</legend>
                        <select defaultValue="Gender" className="select" onChange={(e) => setGender(e.target.value)}>
                            <option disabled={true}>Pick a Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>


                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">About</legend>
                            <textarea className="textarea" placeholder="Type here" value={about}
                                onChange={(e) => setAbout(e.target.value)}></textarea>
                        </fieldset>



                        {error && <p className='text-red-500 text-lg bold'>{"Error:" + error}</p>}
                        <div className="card-actions justify-center mt-4">
                            <button className="btn btn-primary" onClick={saveProfile}>Save</button>
                        </div>


                    </div>
                </div>
            </div>

            <div>
                <UserCard firstName={firstName} lastName={lastName} age={age} gender={gender}
                    photoUrl={photoUrl} about={about} />

                {showToast && <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile Updated</span>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default EditProfile