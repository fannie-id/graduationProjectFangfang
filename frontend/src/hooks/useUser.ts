import {createUser, getMe, loginUser} from "../api/user-api-calls";
import {LoginUser, RegisterUser} from "../model/User";
import {useEffect, useState} from "react";

export default function useUser() {
    const [username, setUsername] = useState<string>("")
    useEffect(() => {
            getMe()
                .then(setUsername)
        }, []
    )

    function getLoginUser(user: LoginUser): Promise<string> {
        return loginUser(user)
            .then(data => {
                setUsername(data)
                return data
            })
    }

    function addUser(newUser: RegisterUser): Promise<any> {
        return createUser(newUser)
            .catch(console.error)
    }

    return {getLoginUser, addUser, username}
}