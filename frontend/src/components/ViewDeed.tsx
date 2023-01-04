import {useNavigate, useParams} from "react-router-dom";
import useDeed from "../hooks/useDeed";
import {Button} from "@mui/material";

export default function ViewDeed() {
    const {id} = useParams()
    const {getDeed} = useDeed(id)
    if (!getDeed) {
        return <p>loading</p>
    }

    const navigate = useNavigate()

    function handleDeedDetail() {
        navigate("/deeds/" + getDeed.id + "/edit/")
    }

    return (
        <div>
            <p>{getDeed.description}</p>
            <p>{getDeed.address.street}</p>
            <p>{getDeed.karmaPoints}</p>

            <Button onClick={handleDeedDetail}>edit</Button>
        </div>
    )

}