import {Deed} from "../model/Deed";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

type DeedSpotProps = {
    deed: Deed
}

export default function DeedSpot(props: DeedSpotProps) {
    const navigate = useNavigate()

    function handleDeedDetail() {
        navigate("/allDeeds/" + props.deed.id)
    }

    return (
        <div>
            <Button onClick={handleDeedDetail}>
                {props.deed.karmaPoints}
            </Button>
            {"Address: " + props.deed.address.street}
        </div>
    )


}
