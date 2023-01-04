import {Box} from "@mui/material";
import {NewDeed} from "../model/Deed";
import {Address} from "../model/Address";
import DeedForm from "./DeedForm";
import useDeeds from "../hooks/useDeeds";


export default function AddDeed() {

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
    }

    return (
        <Box>
            <DeedForm deed={emptyDeed}
                      submitDeed={submitDeed}/>


        </Box>


    )
}