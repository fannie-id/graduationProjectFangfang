import DeedSpot from "./DeedSpot";
import {Deed} from "../model/Deed";

type DeedsListProps ={
    deeds: Deed[]
}
export default function DeedsList(props:DeedsListProps){

    const allDeeds = props.deeds.map(deed => <DeedSpot key={deed.id} deed={deed}/>)


    return(
      <div>
          {allDeeds}
      </div>
    )
}