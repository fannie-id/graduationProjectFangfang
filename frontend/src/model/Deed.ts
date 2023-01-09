import {Address} from "./Address";

export type Deed = {
    id: string,
    description: string,
    address: Address,
    karmaPoints: number,
    deedStatus: DeedStatus
}

export type NewDeed = {
    description: string,
    address: Address,
    karmaPoints: number,

}

export enum DeedStatus {
    CREATED,
    ASSIGNED,
    IN_PROGRESS,
    DONE,
    ACCEPTED
}
