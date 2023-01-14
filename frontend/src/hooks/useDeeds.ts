import {useEffect, useState} from "react";
import {Deed} from "../model/Deed";
import {addDeed, getDeeds} from "../api/deed-api-calls";

export default function useDeeds() {
    const [deeds, setDeeds] = useState<Deed[]>([])
    useEffect(() => {
        getDeeds()
            .then(data => setDeeds(data))
            .catch(console.error)
    }, [])

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