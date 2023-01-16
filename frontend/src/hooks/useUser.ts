import {createUser, loginUser} from "../api/user-api-calls";
import {LoginUser, RegisterUser} from "../model/User";

export default function useUser() {

    function getLoginUser(user: LoginUser) {
        loginUser(user)
    }

    function addUser(newUser: RegisterUser) {
        createUser(newUser)
            .catch(console.error)
    }

    return {getLoginUser, addUser}
}