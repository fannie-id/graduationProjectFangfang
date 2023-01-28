import React, {useMemo, useState} from 'react';
import {Deed} from "../../model/Deed";

import Map, {FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup, ScaleControl} from 'react-map-gl';

import Pin from './Pin';
import PinMe from "./PinMe";

const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
type MapDeedsProps = {
    username: string | undefined
    deeds: Deed[]
    width: string
    height: string
}
export default function MapDeeds(props: MapDeedsProps) {
    const [popupInfo, setPopupInfo] = useState<Deed | null>(null);
    let lat = 48.4667
    let lng = 11.9333
    if (props.deeds.length === 1 && props.deeds[0]) {
        lat = props.deeds[0].lat
        lng = props.deeds[0].lng
    }

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
                    <h2 style={{
                        position: "absolute",
                        bottom: "12px",
                        left: "35%",
                        color: "white"
                    }}>{deed.karmaPoints} </h2>
                    {deed.author === props.username ? <PinMe/> : <Pin/>}
                </Marker>
            )),
        [props.deeds, props.username]
    );

    return (
        <>
            <Map
                initialViewState={{
                    latitude: lat,
                    longitude: lng,
                    zoom: 13,
                    bearing: 0,
                    pitch: 0
                }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={TOKEN}
                style={{width: props.width, height: props.height}}

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
                            <h2>{popupInfo.karmaPoints} </h2>
                            <a
                                href={`/deeds/${popupInfo.id}`}
                            >
                                {popupInfo.description}
                            </a>
                        </div>
                    </Popup>
                )}
            </Map>

        </>
    );
}
