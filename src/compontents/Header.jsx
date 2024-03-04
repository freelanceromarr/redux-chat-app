import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../features/api/auth/authSlice";

const Header = () => {

    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(userLoggedOut())
        localStorage.clear();
    }
    const{user, accessToken}=useSelector(state=>state.auth)
    return ( 
        <nav
                className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between h-16 items-center">
                        <img className="h-10" src="./assets/lws-logo-dark.svg" alt="logo"/>
                        <ul  className="flex justify-between">
                            <li className="text-white">
                               
                                <span className="cursor-pointer p-4">{user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)}</span>
                            </li>
                            <li className="text-white">
                               
                                <span className="cursor-pointer p-4" onClick={handleLogout} >Logout</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
     );
}
 
export default Header;