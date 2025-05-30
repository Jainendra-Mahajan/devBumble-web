import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginButton = () => {
        setIsLoginForm(!isLoginForm);
    }
    const handleLogin = async () => {

        try {
            const res = await axios.post(BASE_URL + "login", {
                email,
                password
            }, {
                withCredentials: true
            })

            dispatch(addUser(res.data));
            return navigate("/")

        } catch (err) {
            setError(err?.response?.data || "Something Went Wrong")
        }
    }

    const handleSignup = async () => {
        try {
            const res = await axios.post(BASE_URL + "signup",
                { firstName, lastName, email, password },
                { withCredentials: true })

            dispatch(addUser(res?.data?.data));
            return navigate("/profile")
        } catch (error) {
            setError(error?.response?.data || "Something Went Wrong")
        }
    }

    return (
        <div>
            <div className="card card-dash bg-base-200 w-96 mx-auto my-16 shadow-2xl">
                <div className="card-body">
                    <h2 className="card-title mx-auto text-2xl text-primary">{isLoginForm ? "Login" : "Sign Up"}</h2>

                    <div className="space-y-4">
                        {!isLoginForm && <fieldset className="fieldset">
                            <legend className="fieldset-legend">First Name</legend>
                            <input type="text" className="input input-bordered bg-base-100" placeholder="Type here" value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </fieldset>}

                        {!isLoginForm && <fieldset className="fieldset">
                            <legend className="fieldset-legend">Last Name</legend>
                            <input type="text" className="input input-bordered bg-base-100" placeholder="Type here" value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </fieldset>}

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email</legend>
                            <input type="text" className="input input-bordered bg-base-100" placeholder="Type here" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input type="password" className="input input-bordered bg-base-100" placeholder="Type here" value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </fieldset>

                    </div>

                    {error && <p className='text-error font-medium text-center mt-2'>{error}</p>}

                    <div className="card-actions justify-center mt-4">
                        <button className="btn btn-primary w-full" onClick={isLoginForm ? handleLogin : handleSignup}>
                            {isLoginForm ? "Login" : "Sign Up"}
                        </button>
                    </div>

                    <p className='text-center mt-3 cursor-pointer text-primary-content/70 hover:text-primary'
                        onClick={handleLoginButton}
                    >{isLoginForm ? "New User? Sign Up" : "Existing User? Login"}</p>
                </div>
            </div>
        </div>
    )
}
export default Login
