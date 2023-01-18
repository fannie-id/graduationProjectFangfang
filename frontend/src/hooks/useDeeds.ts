import {useEffect, useState} from "react";
import {Deed} from "../model/Deed";
import {addDeed, getDeeds} from "../api/deed-api-calls";
import {UserInfo} from "../model/User";

export default function useDeeds(user: UserInfo | undefined) {
    const [deeds, setDeeds] = useState<Deed[]>([])
    useEffect(() => {
        getDeeds()
            .then(data => setDeeds(data))
            .catch(console.error)
    }, [user])

    function addNewDeed(newDeed: Deed) {
        addDeed(newDeed)
            .then((savedDeed => {
                setDeeds(prevDeeds => {
                    return [...prevDeeds, savedDeed]
                })
            }))
            .catch(console.error)
    }

    return{deeds,addNewDeed}
}