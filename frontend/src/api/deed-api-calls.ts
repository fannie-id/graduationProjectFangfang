import axios from "axios";
import {Deed} from "../model/Deed";

const deedEndPoint: string = "/api/deeds"

export function getDeeds(): Promise<Deed[]> {
    return axios.get(deedEndPoint)
        .then(response => response.data)
}

export function getDeedById(id: string): Promise<Deed> {
    return axios.get(deedEndPoint + "/" + id)
        .then(response => response.data)
}

export function addDeed(newDeed: Deed): Promise<Deed> {
    return axios.post(deedEndPoint, newDeed)
        .then(response => response.data)
}

export function editDeed(deed: Deed): Promise<Deed> {
    return axios.put(deedEndPoint + "/" + deed.id, deed)
        .then(response => response.data)
}

export function deleteById(id: string) {
    axios.delete(deedEndPoint + "/" + id)
        .then(response => response.data)
}