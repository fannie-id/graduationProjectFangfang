import {Deed} from "../model/Deed";
import {useEffect, useState} from "react";
import {deleteById, editDeed, getDeedById} from "../api/api-calls";

export default function useDeed(id: string | undefined) {

    const [getDeed, setGetDeed] = useState<Deed>()

    useEffect(() => {
        if (id) {
            getDeedViaId(id)
        }
    }, [id])

    function getDeedViaId(id: string) {
        getDeedById(id)
            .then(data => {
                setGetDeed(data)

            })
            .catch(console.error)
    }


    function editDeedViaId(deed: Deed) {
        editDeed(deed)
            .then(data => {
                setGetDeed(data)
            })
            .catch(console.error)
    }

    function deleteDeedById(id: string) {
        deleteById(id)
    }


    return {getDeed, deleteDeedById, editDeed: editDeedViaId}

}