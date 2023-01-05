import {useNavigate, useParams} from "react-router-dom";
import useDeed from "../hooks/useDeed";
import {Button} from "@mui/material";

export default function ViewDeed() {

    const {id} = useParams()

    if (!id) {
        return <p>id not found</p>
    }
    const {getDeed} = useDeed(id)


    const navigate = useNavigate()

    if (!getDeed) {
        return <p>loading</p>
    }

    function handleEditDeed() {
        if (getDeed) {
            navigate("/deeds/" + getDeed.id + "/edit")
        }
    }

    return (
        <div>
            <p>{getDeed.description}</p>
            <p>{getDeed.address.street}</p>
            <p>{getDeed.karmaPoints}</p>

            <Button onClick={handleEditDeed}>edit</Button>
        </div>
    )

}