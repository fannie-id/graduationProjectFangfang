import {useNavigate, useParams} from "react-router-dom";
import useDeed from "../hooks/useDeed";
import {Box, Button} from "@mui/material";
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

export default function ViewDeed() {

    const {id} = useParams()

    const {getDeed, deleteDeedById} = useDeed(id)


    const navigate = useNavigate()

    if (!getDeed) {
        return <p>loading</p>
    }

    if (!getDeed.id) {
        return <p>invalid Id</p>
    }

    function handleEditDeed() {
        if (getDeed) {
            navigate("/deeds/" + getDeed.id + "/edit")
        }
    }

    function handleDeleteDeed() {
        if (getDeed && getDeed.id) {
            deleteDeedById(getDeed.id)
            navigate("/deeds")
        }
    }

    return (
        <Box margin={"5px"}
             flexDirection={"column"}
             display={"grid"}
             flexWrap={"wrap"}
             justifyContent={"center"}>

            <p>Deed: {getDeed.description}</p>
            <p>Ort: {getDeed.address.street} {getDeed.address.houseNumber}</p>
            <p>KarmaPoints: {getDeed.karmaPoints}</p>

            <Button onClick={handleEditDeed}>
                <EditLocationAltIcon color="success"/>
            </Button>
            <Button onClick={handleDeleteDeed}>
                <DeleteSweepIcon color="success"/>
            </Button>
        </Box>
    )

}