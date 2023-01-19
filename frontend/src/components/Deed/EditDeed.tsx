import {useNavigate, useParams} from "react-router-dom";
import useDeed from "../../hooks/useDeed";
import DeedForm from "./DeedForm";
import {Deed} from "../../model/Deed";

export default function EditDeed() {
    const navigate = useNavigate()
    const {id} = useParams()

    const {getDeed, editDeed} = useDeed(id)

    if (!getDeed) {
        return <p>loading</p>
    }

    function submitDeed(deed: Deed) {

        editDeed(deed)
        navigate("/deeds/" + id)

    }

    return (
        <div>
            <DeedForm deed={getDeed}
                      submitDeed={submitDeed}/>
        </div>
    )
}