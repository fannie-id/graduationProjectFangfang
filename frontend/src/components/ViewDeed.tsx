import {useNavigate, useParams} from "react-router-dom";
import useDeed from "../hooks/useDeed";
import {Button} from "@mui/material";

export default function ViewDeed() {

    const {id} = useParams()

    const {getDeed, deleteDeedById} = useDeed(id)


    const navigate = useNavigate()

    if (!getDeed) {
        return <p>loading</p>
    }

    function handleEditDeed() {
        if (getDeed) {
            navigate("/deeds/" + getDeed.id + "/edit")
        }
    }

    function handleDeleteDeed() {
        if (getDeed) {
            deleteDeedById(getDeed.id)
            navigate("/deeds")
        }
    }

    return (
        <div>
            <p>{getDeed.description}</p>
            <p>{getDeed.address.street}</p>
            <p>{getDeed.karmaPoints}</p>

            <Button onClick={handleEditDeed}>edit</Button>
            <Button onClick={handleDeleteDeed}>delete</Button>
        </div>
    )

}