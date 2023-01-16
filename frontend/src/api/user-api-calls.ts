import axios from "axios";
import {LoginUser, RegisterUser} from "../model/User";

const userEndPoint: string = "/api/users";

export function createUser(newUser: RegisterUser) {
    return axios.post(userEndPoint, newUser)
}

export function loginUser(loginUser: LoginUser) {

    axios.post(userEndPoint + "/login", undefined, {
        auth: {
            username: loginUser.username,
            password: loginUser.password
        },
    })
        .then((response) => response.data)
        .then(data => console.log(data))
}