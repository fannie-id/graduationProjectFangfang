import {Box} from "@mui/material";
import {Deed, DeedStatus} from "../model/Deed";
import {Address} from "../model/Address";
import DeedForm from "./DeedForm";
import useDeeds from "../hooks/useDeeds";
import {useNavigate} from "react-router-dom";


export default function AddDeed() {
    const navigate = useNavigate()
    const {addNewDeed} = useDeeds()
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
        addNewDeed(deed)
        navigate("/deeds")
    }

    return (
        <Box>
            <DeedForm deed={emptyDeed} isNew={true}
                      submitDeed={submitDeed}/>
        </Box>


    )
}