import DeedsList from "./DeedsList";
import AddDeed from "./AddDeed";
import useDeeds from "../hooks/useDeeds";

export default function DeedApp() {
    const {deeds, addNewDeed} = useDeeds()
    return (<div>
            <DeedsList deeds={deeds}/>
            <AddDeed addDeed={addNewDeed}/>
        </div>
    )
}