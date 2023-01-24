import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import './MapDeeds.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {Deed} from "../../model/Deed";
import {AddCircle} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";

mapboxgl.accessToken = 'pk.eyJ1IjoiZmFuZ2Zhbmd3IiwiYSI6ImNsZDRpODFpazBzd2kzcHByY2NsbTM4a2YifQ.HwaQPqclw2a40Vn0t1iNMQ';
type MapDeedsProps = {
    deeds: Deed[]
}
export default function MapDeeds(props: MapDeedsProps) {


    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [marks, setMarks] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (map.current) return; // initialize map only once

        if (!mapContainer.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [11.9333, 48.4667],
            zoom: 13
        });


    });


    useEffect(() => {
        if (!marks) {


            for (const deed of props.deeds) {

                // create a HTML element for each feature
                const el = document.createElement('div');
                el.className = 'marker';

                if (map.current) {

                    new mapboxgl.Marker(el)
                        .setLngLat([deed.lng, deed.lat])
                        .setPopup(
                            new mapboxgl.Popup({offset: 25}) // add popups
                                .setHTML(
                                    `<h3>${deed.karmaPoints}</h3>
                                     <a href='/deeds/${deed.id}'> ${deed.description} </a>`
                                )
                        )
                        .addTo(map.current)
                    setMarks(true)
                }
            }
        }
    }, [])

    function handleDeedDetail() {
        navigate("/deeds/add")
    }

    return (
        <div>
            <div ref={mapContainer} className="map-container"/>
            <IconButton onClick={handleDeedDetail} type={"submit"}>
                <AddCircle color="success" fontSize="large"/>
            </IconButton>
        </div>
    );
}