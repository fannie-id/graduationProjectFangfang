import axios from "axios";
import {Deed, NewDeed} from "../model/Deed";

const deedEndPoint: string = "/api/deeds"

export function getDeeds():Promise<Deed[]>{
    return axios.get(deedEndPoint)
        .then(response=>response.data)
}

export function getDeedById(id: string): Promise<Deed> {
    return axios.get(deedEndPoint + "/" + id)
        .then(response => response.data)
}

export function addDeed(newDeed: NewDeed): Promise<Deed> {
    return axios.post(deedEndPoint, newDeed)
        .then(response => response.data)
}

export function editDeed(deed: Deed): Promise<Deed> {
    return axios.put(deedEndPoint + "/" + deed.id, deed)
        .then(response => response.data)
}