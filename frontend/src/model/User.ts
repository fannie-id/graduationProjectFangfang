export type UserRegister = {
import {Address} from "./Address";

export type RegisterUser = {
    username: string,
    email: string,
    password: string
}

export type UserLogin = {
    username: string,
    password: string
}

export type UserInfo = {
    username: string,
    email: string,
    givenDeeds: string[],
    takenDeeds: string[],
    address: Address,
    karmaPoints: number
}