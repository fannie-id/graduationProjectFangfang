import {useNavigate, useParams} from "react-router-dom";
import useDeed from "../hooks/useDeed";
import DeedForm from "./DeedForm";
import {Deed, NewDeed} from "../model/Deed";

export default function EditDeed() {
    const navigate = useNavigate()
    const {id} = useParams()
    if (!id) {
        return <p>id not found</p>
    }

    const {getDeed, editDeed} = useDeed(id)

    if (!getDeed) {
        return <p>loading</p>
    }

    function submitDeed(deed: Deed | NewDeed) {
        if ("id" in deed) {
            editDeed(deed)
            navigate("/deeds")
        }
    }

    return (
        <div>
            <DeedForm deed={getDeed}
                      submitDeed={submitDeed}/>
        </div>
    )
}