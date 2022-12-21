import {Deed} from "../model/Deed";

type DeedCardProps = {
    deed: Deed
}

export default function DeedCard(props: DeedCardProps) {

return(
    <div>
        {"description: "+ props.deed.description +" karmaPoints: "+props.deed.karmaPoints+" Address: "+props.deed.address}
    </div>
)


}
