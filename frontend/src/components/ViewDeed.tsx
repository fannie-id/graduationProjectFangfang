import {useNavigate, useParams} from "react-router-dom";
import useDeed from "../hooks/useDeed";
import {Box, Button} from "@mui/material";
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import {DeedStatus} from "../model/Deed";

export default function ViewDeed() {

    const {id} = useParams()

    const {getDeed, deleteDeedById, editDeed} = useDeed(id)


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

    function handleStatusChange() {
        if (getDeed) {
            const deedToSave = {...getDeed, deedStatus: nextStatus(getDeed.deedStatus)}
            editDeed(deedToSave)
        }

    }

    function nextStatus(status: DeedStatus) {
        switch (status) {
            case 0:
                return 1;
            case 1:
                return 2;
            case 2:
                return 3;
            case 3:
                return 4;
            case 4:
                return 4;
            default:
                return 1;
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
            <p>Status: {getDeed.deedStatus}</p>

            <Button onClick={handleEditDeed}>
                <EditLocationAltIcon color="success"/>
            </Button>
            <Button onClick={handleDeleteDeed}>
                <DeleteSweepIcon color="success"/>
            </Button>


            <Button onClick={handleStatusChange}>
                next
            </Button>
        </Box>
    )

}