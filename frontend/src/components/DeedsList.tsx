import DeedCard from "./DeedCard";
import useDeeds from "../hooks/useDeeds";

export default function DeedsList(){
    const{deeds} = useDeeds()


    return(
      <div>
          {deeds.map(deed=><DeedCard key={deed.id} deed={deed}/>)}
      </div>
    )
}