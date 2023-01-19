import {useNavigate, useParams} from "react-router-dom";
import useDeed from "../../hooks/useDeed";
import {Box, Button} from "@mui/material";
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import {DeedStatus} from "../../model/Deed";
import HandshakeIcon from '@mui/icons-material/Handshake';
import {UserInfo} from "../../model/User";

type ViewDeedProps = {
    user: UserInfo
    userGainKP: (points: number, username: string) => void
}
export default function ViewDeed(props: ViewDeedProps) {

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
            if (getDeed.deedStatus === DeedStatus.CREATED) {
                const deedToSave = {...getDeed, deedStatus: nextStatus(getDeed.deedStatus), maker: props.user.username}
                editDeed(deedToSave)
            } else if (getDeed.deedStatus === DeedStatus.DONE) {
                const deedToSave = {...getDeed, deedStatus: nextStatus(getDeed.deedStatus)}
                editDeed(deedToSave)

                props.userGainKP(getDeed.karmaPoints, getDeed.maker)
            } else {
                const deedToSave = {...getDeed, deedStatus: nextStatus(getDeed.deedStatus)}
                editDeed(deedToSave)
            }
        }

    }

    function nextStatus(status: DeedStatus) {
        switch (status) {
            case DeedStatus.CREATED:
                return DeedStatus.ASSIGNED;
            case DeedStatus.ASSIGNED:
                return DeedStatus.IN_PROGRESS;
            case DeedStatus.IN_PROGRESS:
                return DeedStatus.DONE;
            case DeedStatus.DONE:
                return DeedStatus.ACCEPTED;
            case DeedStatus.ACCEPTED:
                return DeedStatus.ACCEPTED;
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

            {getDeed.deedStatus === DeedStatus.CREATED && getDeed.author === props.user.username &&
                <Button onClick={handleEditDeed}>
                    <EditLocationAltIcon color="success"/>
                </Button>
            }
            {getDeed.deedStatus === DeedStatus.CREATED && getDeed.author === props.user.username &&
                <Button onClick={handleDeleteDeed}>
                    <DeleteSweepIcon color="success"/>
                </Button>
            }

            {((getDeed.deedStatus !== DeedStatus.DONE && getDeed.author !== props.user.username)
                    || (getDeed.deedStatus === DeedStatus.DONE && getDeed.author === props.user.username)) &&
                <Button onClick={handleStatusChange}>
                    <HandshakeIcon color="success"/>
                </Button>}
        </Box>
    )

}