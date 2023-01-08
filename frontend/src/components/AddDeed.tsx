import {Box} from "@mui/material";
import {NewDeed} from "../model/Deed";
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
    const emptyDeed: NewDeed = {
        "description": "",
        "address": address,
        "karmaPoints": 0
    }


    function submitDeed(deed: NewDeed) {
        addNewDeed(deed)
        navigate("/deeds")
    }

    return (
        <Box>
            <DeedForm deed={emptyDeed}
                      submitDeed={submitDeed}/>


        </Box>


    )
}