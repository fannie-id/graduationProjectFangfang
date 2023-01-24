import * as React from 'react';
import {AddCircle} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";


export default function PopUp() {
    const navigate = useNavigate()

    function handleDeedDetail() {
        navigate("/deeds/add")
    }


    return (
        <div className="control-panel">

            <IconButton onClick={handleDeedDetail} type={"submit"}>
                <AddCircle color="success" fontSize="large"/>
            </IconButton>


            <h3>Marker, Popup, NavigationControl and FullscreenControl </h3>
            <p>
                Map showing top 20 most populated cities of the United States. Click on a marker to learn
                more.
            </p>
            <p>
                Data source:{' '}
                <a href="https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population">
                    Wikipedia
                </a>
            </p>
            <div className="source-link">
                <a
                    href="https://github.com/visgl/react-map-gl/tree/7.0-release/examples/controls"
                    target="_new"
                >
                    View Code ↗
                </a>
            </div>
        </div>
    );
}