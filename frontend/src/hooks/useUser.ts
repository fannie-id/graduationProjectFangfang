import {UserInfo, UserLogin, UserRegister} from "../model/User";
import {createUser, deleteLoggedInUser, getMe, loginUser, logoutUser, putUser} from "../api/user-api-calls";

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
            }).catch(console.error)
    }

    function addUser(newUser: UserRegister): Promise<any> {
        return createUser(newUser)
            .catch(console.error)
    }

    function editUser(changedUser: UserInfo): Promise<UserInfo> {
        return putUser(changedUser)
            .then(user => {
                setLoggedInUser(user)
                return user
            })
    }

    function deleteUser(user: UserInfo): Promise<any> {
        return deleteLoggedInUser(user)
            .then((data) => {
                setLoggedInUser(emptyUser)
            }).catch(console.error)
    }

    return {getLoginUser, addUser, loggedInUser, logout, editUser, deleteUser}
}