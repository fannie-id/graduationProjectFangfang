import {Deed} from "../model/Deed";

type DeedCardProps = {
    deed: Deed
}

export default function DeedCard(props: DeedCardProps) {
return(
    <div>
        {"description: "+ props.deed.description +" karmapoints: "+props.deed.karmaPoint+" Address: "+props.deed.address}
    </div>
)


}