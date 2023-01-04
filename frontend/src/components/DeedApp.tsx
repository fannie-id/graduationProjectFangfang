import DeedsList from "./DeedsList";
import useDeeds from "../hooks/useDeeds";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function DeedApp() {
    const {deeds} = useDeeds()
    const navigate = useNavigate()

    function handleDeedDetail() {
        navigate("/deeds/add")
    }


    return (<div>
            <DeedsList deeds={deeds}/>

            <Button onClick={handleDeedDetail}>
                Add
            </Button>

        </div>
    )
}