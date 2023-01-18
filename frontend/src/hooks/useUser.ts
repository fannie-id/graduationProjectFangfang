import {createUser, getMe, loginUser, logoutUser} from "../api/user-api-calls";
import {UserLogin, UserRegister} from "../model/User";
import {useEffect, useState} from "react";

export default function useUser() {
    const [username, setUsername] = useState<string>("")
    useEffect(() => {
        getMe()
            .then(setUsername)
    }, [])

    function getLoginUser(user: UserLogin): Promise<string> {
        return loginUser(user)
            .then(data => {
                setUsername(data)
                return data
            })
    }

    function logout(): Promise<any> {
        return logoutUser()
            .then((data) => {
                setUsername(data)
            })
    }

    function addUser(newUser: UserRegister): Promise<any> {
        return createUser(newUser)
            .catch(console.error)
    }

    return {getLoginUser, addUser, username, logout}
}