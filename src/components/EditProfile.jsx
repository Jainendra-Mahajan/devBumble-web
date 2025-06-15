import React, { useState } from 'react';
import UserCard from './UserCard';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from "../utils/userSlice";
import { toast } from 'react-toastify';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName || "");
    const [lastName, setLastName] = useState(user.lastName || "");
    const [age, setAge] = useState(user.age || "");
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
    const [about, setAbout] = useState(user.about || "");
    const [gender, setGender] = useState(user.gender || "");
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    const saveProfile = async () => {
        try {
            setError("");
            const res = await axios.patch(
                BASE_URL + "profile/edit",
                { firstName, lastName, age, photoUrl, about, gender },
                { withCredentials: true }
            );

            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (err) {
            toast.error(message);
        }
    };

    return (
        <div className="flex flex-col-reverse lg:flex-row items-start justify-center gap-8 p-4 md:p-8 max-w-6xl mx-auto">
            <div className="w-full lg:w-1/2">
                <UserCard
                    firstName={firstName}
                    lastName={lastName}
                    age={age}
                    gender={gender}
                    photoUrl={photoUrl}
                    about={about}
                />
                {showToast && (
                    <div className="toast toast-top toast-center">
                        <div className="alert alert-success">
                            <span>Profile Updated</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="card w-full lg:w-1/2 bg-base-200 shadow-xl">
                <div className="card-body space-y-4">
                    <h2 className="card-title text-center text-2xl font-semibold text-primary">
                        Edit Profile
                    </h2>

                    <div className="space-y-3">
                        <InputField label="First Name" value={firstName} onChange={setFirstName} />
                        <InputField label="Last Name" value={lastName} onChange={setLastName} />
                        <InputField label="Age" value={age} onChange={setAge} type="number" />
                        <InputField label="Photo URL" value={photoUrl} onChange={setPhotoUrl} />
                        <TextareaField label="About" value={about} onChange={setAbout} />

                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Gender</span>
                            </label>
                            <select
                                value={gender || ""}
                                onChange={(e) => setGender(e.target.value)}
                                className="select select-bordered w-full"
                            >
                                <option value="" disabled>
                                    Pick a Gender
                                </option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

                    <div className="card-actions justify-center">
                        <button className="btn btn-primary w-full sm:w-1/2" onClick={saveProfile}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;

const InputField = ({ label, value, onChange, type = "text" }) => (
    <div>
        <label className="label">
            <span className="label-text font-medium">{label}</span>
        </label>
        <input
            type={type}
            className="input input-bordered w-full"
            placeholder={`Enter ${label.toLowerCase()}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

const TextareaField = ({ label, value, onChange }) => (
    <div>
        <label className="label">
            <span className="label-text font-medium">{label}</span>
        </label>
        <textarea
            className="textarea textarea-bordered w-full"
            rows="3"
            placeholder={`Enter ${label.toLowerCase()}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);
