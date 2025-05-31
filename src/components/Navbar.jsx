import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {

    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "logout", {}, { withCredentials: true });
            dispatch(removeUser());
            return navigate("/login");
        } catch (err) {
            // handle error if needed
        }
    };

    return (
        <nav className="navbar bg-base-100 shadow-md px-6 py-3 flex items-center justify-between">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-2xl font-semibold tracking-wide hover:text-primary transition-colors duration-300">
                    DevBumble
                </Link>
            </div>

            {user && (
                <div className="relative dropdown dropdown-end">
                    <button
                        tabIndex={0}
                        className="flex items-center gap-2 focus:outline-none focus:ring-primary transition"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <span className="text-gray-300 font-medium">Welcome, {user.firstName}</span>
                        <img
                            alt={`${user.firstName} avatar`}
                            src={user.photoUrl}
                            className="w-12 h-12 rounded-full object-cover border-2 border-primary cursor-pointer"
                        />
                    </button>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu rounded-lg shadow-lg mt-2 w-56 p-2 border border-gray-200"
                        aria-label="User menu"
                    >
                        <li>
                            <Link to="/profile" className="flex justify-between items-center px-4 py-2 rounded hover:bg-primary/10 transition">
                                Profile
                                <span className="badge badge-primary text-xs">New</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/connections" className="px-4 py-2 rounded hover:bg-primary/10 transition">
                                Connections
                            </Link>
                        </li>
                        <li>
                            <Link to="/requests" className="px-4 py-2 rounded hover:bg-primary/10 transition">
                                My Requests
                            </Link>
                        </li>
                        <li onClick={handleLogout}>
                            <button className="w-full text-left px-4 py-2 rounded hover:bg-primary/10 transition focus:outline-none">
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
