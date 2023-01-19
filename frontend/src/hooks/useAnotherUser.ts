import {putKP} from "../api/user-api-calls";

export default function useAnother() {

    function userGainKP(points: number, username: string) {
        putKP(points, username)
    }

    return {userGainKP}
}