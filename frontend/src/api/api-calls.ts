import axios from "axios";
import {NewDeed} from "../model/Deed";

const deedEndPoint: string = "/api/deeds"

export function getDeeds(){
    return axios.get(deedEndPoint)
        .then(response=>response.data)
}


export function addDeed(newDeed:NewDeed){
    return axios.post(deedEndPoint,newDeed)
        .then(response=>response.data)
}