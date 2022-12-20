import {useEffect, useState} from "react";
import {Deed, NewDeed} from "../model/Deed";
import {getDeeds,addDeed} from "../api/api-calls";

export default function useDeeds(){
    const[deeds,setDeeds]=useState<Deed[]>([])
    useEffect(()=>{
        getDeeds()
            .then(data=>setDeeds(data))
            .catch(console.error)
    },[])

    function addNewDeed(newDeed:NewDeed){
        addDeed(newDeed)
            .then((response=>{
                setDeeds(prevState => {
                    return[...prevState,response.data]
                })
            }))

    }


    return{deeds,addNewDeed}
}