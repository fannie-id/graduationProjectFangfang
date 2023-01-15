import {LoginUser} from "../model/User";

export default function useUser() {

    function getLoginUser(loginUser: LoginUser) {
        loginUser(loginUser)
            .catch(console.error)
    }

    return {getLoginUser}
}