import DeedsList from "./DeedsList";
import {Box, IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {AddCircle} from "@mui/icons-material";
import {Deed} from "../model/Deed";

type DeedAppProps = {
    deeds: Deed[]
}
export default function DeedApp(props: DeedAppProps) {

    const navigate = useNavigate()

    function handleDeedDetail() {
        navigate("/deeds/add")
    }


    return (<Box margin={"5px"}
                 flexDirection={"column"}
                 display={"grid"}
                 flexWrap={"wrap"}
                 justifyContent={"center"}>
            <DeedsList deeds={props.deeds}/>


            <IconButton onClick={handleDeedDetail} type={"submit"}>
                <AddCircle color="success" fontSize="large"/>
            </IconButton>

        </Box>
    )
}