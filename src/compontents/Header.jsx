import { useDispatch } from "react-redux";
import { userLoggedOut } from "../features/api/auth/authSlice";

const Header = () => {

    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(userLoggedOut())
        localStorage.clear();
    }
    return ( 
        <nav
                className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between h-16 items-center">
                        <img className="h-10" src="./assets/lws-logo-dark.svg" alt="logo"/>
                        <ul>
                            <li className="text-white">
                               
                                <span className="cursor-pointer" onClick={handleLogout} >Logout</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
     );
}
 
export default Header;