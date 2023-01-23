import {Deed} from "../../model/Deed";
import MapDeeds from "../Map/MapDeeds";

type DeedsListProps ={
    deeds: Deed[]

}
export default function DeedsList(props:DeedsListProps){

    // const allDeeds = props.deeds.map(deed => <DeedSpot key={deed.id} deed={deed}/>)


    return(
        <MapDeeds deeds={props.deeds}/>
    )
}