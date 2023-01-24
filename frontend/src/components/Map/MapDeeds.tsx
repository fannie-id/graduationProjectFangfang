import React, {useMemo, useState} from 'react';
//import './MapDeeds.css';
//import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {Deed} from "../../model/Deed";
import {AddCircle} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";

import Map, {FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup, ScaleControl} from 'react-map-gl';

import Pin from './Pin';

const TOKEN = 'pk.eyJ1IjoiZmFuZ2Zhbmd3IiwiYSI6ImNsZDRpODFpazBzd2kzcHByY2NsbTM4a2YifQ.HwaQPqclw2a40Vn0t1iNMQ';
// mapboxgl.accessToken = 'pk.eyJ1IjoiZmFuZ2Zhbmd3IiwiYSI6ImNsZDRpODFpazBzd2kzcHByY2NsbTM4a2YifQ.HwaQPqclw2a40Vn0t1iNMQ';
type MapDeedsProps = {
    deeds: Deed[]
}
export default function MapDeeds(props: MapDeedsProps) {
    const [popupInfo, setPopupInfo] = useState<Deed | null>(null);
    const pins = useMemo(
        () =>
            props.deeds.map((deed, index) => (
                <Marker
                    key={`marker-${index}`}
                    longitude={deed.lng}
                    latitude={deed.lat}
                    anchor="bottom"
                    onClick={e => {
                        // If we let the click event propagates to the map, it will immediately close the popup
                        // with `closeOnClick: true`
                        e.originalEvent.stopPropagation();
                        setPopupInfo(deed);
                    }}
                >
                    <Pin/>
                </Marker>
            )),
        [props.deeds]
    );


    const navigate = useNavigate()

    function handleDeedDetail() {
        navigate("/deeds/add")
    }

    return (
        <>
            <Map
                initialViewState={{
                    latitude: 48.4667,
                    longitude: 11.9333,
                    zoom: 13,
                    bearing: 0,
                    pitch: 0
                }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={TOKEN}
                style={{width: "360px", height: "540px"}}

            >
                <GeolocateControl position="top-left"/>
                <FullscreenControl position="top-left"/>
                <NavigationControl position="top-left"/>
                <ScaleControl/>

                {pins}

                {popupInfo && (
                    <Popup
                        anchor="bottom"
                        longitude={Number(popupInfo.lng)}
                        latitude={Number(popupInfo.lat)}
                        onClose={() => setPopupInfo(null)}
                    >
                        <div>
                            {popupInfo.karmaPoints} |{' '}
                            <a
                                target="_new"
                                href={`/deeds/${popupInfo.id}`}
                            >
                                ${popupInfo.description}
                            </a>
                        </div>
                    </Popup>
                )}
            </Map>
            <IconButton onClick={handleDeedDetail} type={"submit"}
                        style={{position: "absolute", bottom: "80px", left: "43%"}}>
                <AddCircle color="success" sx={{fontSize: 50}}/>
            </IconButton>
        </>
    );
}
