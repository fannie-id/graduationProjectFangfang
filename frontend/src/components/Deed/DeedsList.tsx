import {Deed} from "../../model/Deed";
import MapDeeds from "../Map/MapDeeds";
import {AddCircle} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

type DeedsListProps = {
    deeds: Deed[]
    username: string | undefined

}
export default function DeedsList(props: DeedsListProps) {
    const navigate = useNavigate()

    function handleDeedDetail() {
        navigate("/deeds/add")
    }

    return (<>


            <MapDeeds deeds={props.deeds} username={props.username} width={"360px"} height={"780px"}/>

            <IconButton onClick={handleDeedDetail} type={"submit"}
                        style={{position: "absolute", bottom: "80px", left: "43%"}}>
                <AddCircle color="success" sx={{fontSize: 50}}/>
            </IconButton>
        </>

    )
}