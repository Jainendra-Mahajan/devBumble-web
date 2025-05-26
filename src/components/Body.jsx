import React, { useEffect } from 'react'
import NavBar from './Navbar'
import { Outlet, useNavigate } from 'react-router'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);
    console.log(userData);

    const fetchUser = async () => {
        if (userData) return;

        try {
            const res = await axios.get(BASE_URL + "profile", { withCredentials: true });
            dispatch(addUser(res.data));
        }
        catch (err) {
            if (err.status === 401) {
                navigate("/login")
            }
            console.error(err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <div >
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body