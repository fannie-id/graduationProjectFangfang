import {Deed} from "../../model/Deed";
import MapDeeds from "../Map/MapDeeds";

type DeedsListProps ={
    deeds: Deed[]

}
export default function DeedsList(props:DeedsListProps){

    return(
        <MapDeeds deeds={props.deeds}/>
    )
}