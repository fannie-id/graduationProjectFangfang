import {Address} from "./Address";

export type Deed = {
    id:string,
    description: string,
    address: Address,
    karmaPoint: number,
}