import {Box} from "@mui/material";
import {Deed, DeedStatus} from "../model/Deed";
import {Address} from "../model/Address";
import DeedForm from "./DeedForm";
import {useNavigate} from "react-router-dom";

type AddDeedProps = {
    addNewDeed: (deed: Deed) => void
}

export default function AddDeed(props: AddDeedProps) {
    const navigate = useNavigate()

    const address: Address = {
        "street": "",
        "houseNumber": "",
        "zip": "",
        "city": "",
        "name": ""
    }
    const emptyDeed: Deed = {
        "description": "",
        "address": address,
        "karmaPoints": 0,
        "deedStatus": DeedStatus.CREATED
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