import axios from "axios";
import {UserLogin, UserRegister} from "../model/User";

const userEndPoint: string = "/api/users";

export function getMe() {
    return axios.get(userEndPoint + "/me")
        .then(response => response.data)
}

export function createUser(newUser: UserRegister) {
    return axios.post(userEndPoint, newUser)
}

export function loginUser(loginUser: UserLogin): Promise<string> {

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