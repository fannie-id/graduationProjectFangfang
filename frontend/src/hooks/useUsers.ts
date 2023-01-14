import {createUser} from "../api/user-api-calls";
import {RegisterUser} from "../model/User";

export default function useUsers() {
    /*const[users,setUsers]=useState([])
    useEffect(() => {
        getUsers()
            .then(data => setUsers(data))
            .catch(console.error)
    }, [])*/

    function addUser(newUser: RegisterUser) {
        createUser(newUser)
            .catch(console.error)
    }

    return {addUser}
}