import {useParams} from "react-router-dom";
import useDeed from "../hooks/useDeed";
import DeedForm from "./DeedForm";
import {Deed, NewDeed} from "../model/Deed";

export default function EditDeed() {

    const {id} = useParams()
    const {getDeed, editDeed} = useDeed(id)
    if (!getDeed) {
        return <p>loading</p>
    }


    function submitDeed(deed: Deed | NewDeed) {
        if (deed.id) {
            editDeed(deed)
        }

    }

    return (
        <div>
            <DeedForm deed={getDeed}
                      submitDeed={submitDeed}/>
        </div>
    )
}