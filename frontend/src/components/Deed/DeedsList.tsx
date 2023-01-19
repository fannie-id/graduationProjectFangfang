import DeedSpot from "./DeedSpot";
import {Deed} from "../../model/Deed";
import {Box} from "@mui/material";

type DeedsListProps ={
    deeds: Deed[]
}
export default function DeedsList(props:DeedsListProps){

    const allDeeds = props.deeds.map(deed => <DeedSpot key={deed.id} deed={deed}/>)


    return(
        <Box flexDirection={"row"} sx={{pb: 7}}>
            {allDeeds}
        </Box>
    )
}