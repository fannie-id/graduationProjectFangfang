import {Deed} from "../model/Deed";
import {useEffect, useState} from "react";
import {getDeedById} from "../api/api-calls";

export default function useDeed(id: string | undefined) {

    const emptyDeed: Deed = {
        id: "",
        description: "",
        address: {
            street: "",
            houseNumber: "",
            zip: "",
            city: "",
            name: ""
        },
        karmaPoints: 0
    }

    const [getDeed, setGetDeed] = useState<Deed>(emptyDeed)

    useEffect(() => {
        if (id) {
            getDeedViaId(id)
        }
    }, [])

    function getDeedViaId(id: string) {
        getDeedById(id)
            .then(data => {
                setGetDeed(data)

            })
            .catch(console.error)
    }

    return {getDeed}

}