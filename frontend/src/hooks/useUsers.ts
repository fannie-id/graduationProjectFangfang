import {createUser} from "../api/user-api-calls";
import {RegisterUser} from "../model/User";

export default function useUsers() {

    function addUser(newUser: RegisterUser) {
        createUser(newUser)
            .catch(console.error)
    }

    return {addUser}
}