import {AddressInfo} from "./AddressInfo";

export type UserRegister = {
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
    address?: AddressInfo,
    karmaPoints: number
}