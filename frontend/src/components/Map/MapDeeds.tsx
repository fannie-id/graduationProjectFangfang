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
        []
    );


    const navigate = useNavigate()


    /*  const mapContainer = useRef(null);
      const map = useRef<mapboxgl.Map | null>(null);
      const [marks, setMarks] = useState<boolean>(false)


      useEffect(() => {
          if (map.current) return; // initialize map only once

          if (!mapContainer.current) return;
          map.current = new mapboxgl.Map({
              container: mapContainer.current,
              style: 'mapbox://styles/mapbox/streets-v12',
              center: [11.9333, 48.4667],
              zoom: 13
          });


      });*/


    /*    useEffect(() => {
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
        }, [marks, props.deeds])*/

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

            <IconButton onClick={handleDeedDetail} type={"submit"}>
                <AddCircle color="success" fontSize="large"/>
            </IconButton>
        </>
    );
}
