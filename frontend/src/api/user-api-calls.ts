import axios from "axios";
import {RegisterUser} from "../model/User";

const userEndPoint: string = "/api/users";

export function createUser(newUser: RegisterUser){
    return axios.post(userEndPoint, newUser)
}
