import {createUser, getMe, loginUser, logoutUser} from "../api/user-api-calls";
import {UserLogin, UserRegister,UserInfo} from "../model/User";
import {useEffect, useState} from "react";

export default function useUser() {
    const [loggedInUser, setLoggedInUser] = useState<string>("")
    useEffect(() => {
        getMe()
            .then(setLoggedInUser)
    }, [])

    function getLoginUser(user: UserLogin): Promise<UserInfo> {
        return loginUser(user)
            .then(user => {
                setLoggedInUser(user.username)
                return user
            })
    }

    function logout(): Promise<any> {
        return logoutUser()
            .then((data) => {
                setLoggedInUser(data)
            })
    }

    function addUser(newUser: UserRegister): Promise<any> {
        return createUser(newUser)
            .catch(console.error)
    }

    return {getLoginUser, addUser, loggedInUser, logout}
}