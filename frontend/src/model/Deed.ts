import {Address} from "./Address";

export type Deed = {
    id?: string,
    description: string,
    address: Address,
    karmaPoints: number,
    deedStatus: DeedStatus,
    author: string,
    maker: string,
}

export enum DeedStatus {
    CREATED = "CREATED",
    ASSIGNED = "ASSIGNED",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
    ACCEPTED = "ACCEPTED"
}
