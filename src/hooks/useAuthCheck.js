import { useEffect, useState } from "react";
import { userLoggedIn } from "../features/api/auth/authSlice";
import { useDispatch } from "react-redux";

const useAuthCheck = () => {
    const dispatch = useDispatch()
    const [authCheck, setAuthCheck] = useState(false)
    useEffect(() => {
        const localAuth = localStorage?.getItem('auth')
        if (localAuth) {
            const auth = JSON.parse(localAuth)
            if (auth?.accessToken && auth?.user) {
                dispatch(userLoggedIn({accessToken: auth.accessToken, user: auth.user}))
                setAuthCheck(true)
            }
        }else {setAuthCheck(true)}
    },[dispatch, setAuthCheck])
    return authCheck;
}
 
export default useAuthCheck;