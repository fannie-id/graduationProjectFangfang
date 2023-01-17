import {createUser, getMe, loginUser, logoutUser} from "../api/user-api-calls";
import {UserLogin, UserRegister,UserInfo} from "../model/User";
import {useEffect, useState} from "react";
import {Address} from "../model/Address";

export default function useUser() {
    const address: Address = {
        "street": "",
        "houseNumber": "",
        "zip": "",
        "city": "",
        "name": ""
    }
    const emptyUser: UserInfo = {
        "username": "anonymousUser",
        "email": "",
        "givenDeeds": [],
        "takenDeeds": [],
        "address": address,
        "karmaPoints": 0
    }
    const [loggedInUser, setLoggedInUser] = useState<UserInfo>()
    useEffect(() => {
        getMe()
            .then(setLoggedInUser)
    }, [])

    function getLoginUser(user: UserLogin): Promise<UserInfo> {
        return loginUser(user)
            .then(user => {
                setLoggedInUser(user)
                return user
            })
    }

    function logout(): Promise<any> {
        return logoutUser()
            .then((data) => {
                setLoggedInUser(emptyUser)
            })
    }

    function addUser(newUser: UserRegister): Promise<any> {
        return createUser(newUser)
            .catch(console.error)
    }

    return {getLoginUser, addUser, loggedInUser, logout}
}