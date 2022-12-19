import {useEffect, useState} from "react";
import {Deed} from "../model/Deed";
import {getDeeds} from "../api/api-calls";

export default function useDeeds(){
    const[deeds,setDeeds]=useState<Deed[]>([])
    useEffect(()=>{
        getDeeds()
            .then(data=>setDeeds(data))
            .catch(console.error)
    },[])


    return{deeds}
}