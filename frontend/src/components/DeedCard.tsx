import {Deed} from "../model/Deed";

type DeedCardProps = {
    deed: Deed
}

export default function DeedCard(props: DeedCardProps) {
return(
    <div>
        {props.deed.description}

    </div>
)


}