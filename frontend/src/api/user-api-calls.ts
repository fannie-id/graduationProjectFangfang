import {Deed} from "../model/Deed";
import axios from "axios";
import {RegisterUser} from "../model/User";

const userEndPoint: string = "/api/users";

export function createUser(newUser: RegisterUser): Promise<Deed> {
    return axios.post(userEndPoint, newUser)
}