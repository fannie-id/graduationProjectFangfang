import {useParams} from "react-router-dom";
import useDeed from "../hooks/useDeed";

export default function DeedDetail() {
    const {id} = useParams()
    const {getDeed} = useDeed(id)
    if (!getDeed) {
        return <p>loading</p>
    }


    return (
        <div>
            <p>{getDeed.description}</p>
        </div>
    )

}