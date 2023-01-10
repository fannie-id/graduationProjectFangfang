import {useNavigate, useParams} from "react-router-dom";
import useDeed from "../hooks/useDeed";
import {Box, Button} from "@mui/material";
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import {DeedStatus} from "../model/Deed";

export default function ViewDeed() {

    const {id} = useParams()

    const {getDeed, deleteDeedById, nextStatusDeed} = useDeed(id)


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
            console.log(nextStatus(getDeed.deedStatus))
            console.log(deedToSave)
            nextStatusDeed(deedToSave)

        }

    }

    function nextStatus(status: DeedStatus): DeedStatus {
        if (status === null) {
            return DeedStatus.CREATED
        }

        switch (status) {
            case DeedStatus.CREATED:
                return DeedStatus.ASSIGNED
            case DeedStatus.ASSIGNED:
                return DeedStatus.IN_PROGRESS
            case DeedStatus.IN_PROGRESS:
                return DeedStatus.DONE
            case DeedStatus.DONE:
                return DeedStatus.ACCEPTED
            case DeedStatus.ACCEPTED:
                return DeedStatus.ACCEPTED
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