import axios from "axios";
import {UserInfo, UserLogin, UserRegister} from "../model/User";

const userEndPoint: string = "/api/users";

const cloudinaryEndPoint: string = "https://api.cloudinary.com/v1_1/dknplivln/image/upload"

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

export function uploadCloudinary(img: File): Promise<any> {
    const data = new FormData()
    data.append("file", img);
    data.append("upload_preset", "karmaApp");
    data.append("cloud_name", "dknplivln");
    return axios.post(cloudinaryEndPoint, data)
        .then((response) => response.data)
}