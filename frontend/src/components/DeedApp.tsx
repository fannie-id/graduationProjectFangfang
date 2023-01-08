import DeedsList from "./DeedsList";
import useDeeds from "../hooks/useDeeds";
import {Box, IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {AddCircle} from "@mui/icons-material";

export default function DeedApp() {
    const {deeds} = useDeeds()
    const navigate = useNavigate()

    function handleDeedDetail() {
        navigate("/deeds/add")
    }


    return (<Box margin={"5px"}
                 flexDirection={"column"}
                 display={"grid"}
                 flexWrap={"wrap"}
                 justifyContent={"center"}>
            <DeedsList deeds={deeds}/>


            <IconButton onClick={handleDeedDetail} type={"submit"}>
                <AddCircle color="success" fontSize="large"/>
            </IconButton>

        </Box>
    )
}