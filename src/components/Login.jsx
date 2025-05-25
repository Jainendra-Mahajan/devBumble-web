import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [email, setEmail] = useState("Jitu@gmail.com");
    const [password, setPassword] = useState("Password@12345");
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            console.log(err);
        }
    }
    return (
        <div>
            <div className="card card-dash bg-base-200 w-96 mx-auto my-15">
                <div className="card-body">
                    <h2 className="card-title mx-auto">Login</h2>

                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email</legend>
                            <input type="text" className="input" placeholder="Type here" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input type="password" className="input" placeholder="Type here" value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </fieldset>
                    </div>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

//install cors