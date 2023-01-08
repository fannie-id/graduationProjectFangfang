import {Deed} from "../model/Deed";
import {Box, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

type DeedSpotProps = {
    deed: Deed
}

export default function DeedSpot(props: DeedSpotProps) {
    const navigate = useNavigate()

    function handleDeedDetail() {
        navigate("/deeds/" + props.deed.id)
    }

    return (
        <Box margin={"8px"}
             flexDirection={"row"}
             display={"grid"}
             flexWrap={"wrap"}>
            <Button onClick={handleDeedDetail}>
                {props.deed.karmaPoints}
            </Button>
            {"Address: " + props.deed.description}
        </Box>
    )


}
