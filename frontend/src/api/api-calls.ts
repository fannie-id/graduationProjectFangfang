import axios from "axios";
import {Deed, NewDeed} from "../model/Deed";

const deedEndPoint: string = "/api/deeds"

export function getDeeds():Promise<Deed[]>{
    return axios.get(deedEndPoint)
        .then(response=>response.data)
}


export function addDeed(newDeed:NewDeed):Promise<Deed>{
    return axios.post(deedEndPoint,newDeed)
        .then(response=>response.data)
}