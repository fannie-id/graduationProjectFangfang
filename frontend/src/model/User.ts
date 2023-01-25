
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
    address?: string,
    name?: string,
    lng?: number,
    lat?: number,
    karmaPoints: number,
    img?: string
}