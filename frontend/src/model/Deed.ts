import {Address} from "./Address";

export type Deed = {
    id:string,
    description: string,
    address: Address,
    karmaPoints: number
}

export type NewDeed ={
    description: string,
    address: Address,
    karmaPoints: number
}
