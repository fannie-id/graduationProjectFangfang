import {Box} from "@mui/material";
import {Deed, DeedStatus} from "../../model/Deed";
import DeedForm from "./DeedForm";
import {useNavigate} from "react-router-dom";
import {UserInfo} from "../../model/User";

type AddDeedProps = {
    addNewDeed: (deed: Deed) => void
    user: UserInfo
}

export default function AddDeed(props: AddDeedProps) {
    const navigate = useNavigate()

    const emptyDeed: Deed = {
        "description": "",
        "address": "",
        "name": "",
        "lng": 0,
        "lat": 0,
        "karmaPoints": 0,
        "deedStatus": DeedStatus.CREATED,
        "author": props.user.username,
        "maker": ""
    }


    function submitDeed(deed: Deed) {
        props.addNewDeed(deed)
        navigate("/deeds")
    }

    return (
        <Box>
            <DeedForm deed={emptyDeed}
                      submitDeed={submitDeed}/>
        </Box>


    )
}