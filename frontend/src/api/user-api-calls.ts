import axios from "axios";
import {UserInfo, UserLogin, UserRegister} from "../model/User";

const userEndPoint: string = "/api/users";

export function getMe() {
    return axios.get(userEndPoint + "/me")
        .then(response => response.data)
}

export function createUser(newUser: UserRegister) {
    return axios.post(userEndPoint, newUser)
}

export function loginUser(loginUser: UserLogin): Promise<UserInfo> {

    return axios.post(userEndPoint + "/login", undefined, {
        auth: {
            username: loginUser.username,
            password: loginUser.password
        },
    })
        .then((response) => response.data)

}

export function logoutUser(): Promise<string> {
    return axios.post(userEndPoint + "/logout")
        .then((response) => response.data)
}

export function putUser(user: UserInfo): Promise<UserInfo> {
    return axios.put(userEndPoint + "/update", user)
        .then((response) => response.data)
}

export function deleteLoggedInUser(user: UserInfo): Promise<string> {
    return axios.delete(userEndPoint + "/" + user.username)
        .then((response) => response.data)
}

export function putKP(points: number, username: string) {
    axios.put(userEndPoint + "/validate/" + username, points, {headers: {"Content-Type": "application/json"}})
        .then((response) => response.data)
}

export function uploadCloudinary(username: string, img: File): Promise<string> {
    const formData = new FormData()
    if (img !== undefined) {
        formData.append("file", img)
        formData.append("upload_preset", "karmaApp");
    }
    return axios.post(userEndPoint + "/" + username, formData)
        .then((response) => response.data)
}