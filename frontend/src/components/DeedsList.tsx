import DeedCard from "./DeedCard";
import {Deed} from "../model/Deed";
type DeedsListProps ={
    deeds: Deed[]
}
export default function DeedsList(props:DeedsListProps){

    const allDeeds = props.deeds.map(deed=><DeedCard key={deed.id} deed={deed}/>)


    return(
      <div>
          {allDeeds}
      </div>
    )
}