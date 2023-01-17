import axios from "axios";
import {LoginUser, RegisterUser} from "../model/User";

const userEndPoint: string = "/api/users";

export function getMe() {
    return axios.get(userEndPoint + "/me")
        .then(response => response.data)
}

export function createUser(newUser: RegisterUser) {
    return axios.post(userEndPoint, newUser)
}

export function loginUser(loginUser: LoginUser): Promise<string> {

    return axios.post(userEndPoint + "/login", undefined, {
        auth: {
            username: loginUser.username,
            password: loginUser.password
        },
    })
        .then((response) => response.data)

}