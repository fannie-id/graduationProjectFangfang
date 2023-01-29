import {UserInfo, UserLogin, UserRegister} from "../model/User";
import {
    createUser,
    deleteLoggedInUser,
    getMe,
    loginUser,
    logoutUser,
    putUser,
    uploadCloudinary
} from "../api/user-api-calls";

import {useEffect, useState} from "react";

export default function useUser() {

    const emptyUser: UserInfo = {
        "username": "anonymousUser",
        "email": "",
        "givenDeeds": [],
        "takenDeeds": [],
        "address": "",
        "karmaPoints": 0,
        "img": ""
    }
    const [loggedInUser, setLoggedInUser] = useState<UserInfo>(emptyUser)

    useEffect(() => {
        if (loggedInUser.username !== "anonymousUser") {
            getMe()
                .then(setLoggedInUser)
        }

    }, [loggedInUser.username])

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

    function uploadImg(username: string, img: File): Promise<string> {
        return uploadCloudinary(username, img)
            .then(data => {
                setLoggedInUser((prevState) => ({...prevState, img: data}))
                return data
            })
    }


    return {getLoginUser, addUser, loggedInUser, logout, editUser, deleteUser, uploadImg}
}