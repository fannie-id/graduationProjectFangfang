import React, {useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import './MapAddDeed.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

/* hotfix: const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

@ts-ignore
mapboxgl.accessToken = TOKEN;*/

type MapAddDeedProps = {
    addGeoCode: (lng: number, lat: number, address: string) => void
}
export default function MapAddDeed(props: MapAddDeedProps) {


    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);


    useEffect(() => {
        if (map.current) return; // initialize map only once

        if (!mapContainer.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [9.5508, 50.9419],
            zoom: 4.5
        });

        const geocoder = new MapboxGeocoder({
            accessToken: 'pk.eyJ1IjoiZmFuZ2Zhbmd3IiwiYSI6ImNsZDRpODFpazBzd2kzcHByY2NsbTM4a2YifQ.HwaQPqclw2a40Vn0t1iNMQ',
            mapboxgl: mapboxgl
        })

        geocoder.on('result', (e) => {
            props.addGeoCode(e.result.center[0], e.result.center[1], e.result.text)

        });

        map.current.addControl(
            geocoder
        );


    });


    return (
        <div>
            <div ref={mapContainer} className="map-container"/>

            <div>

            </div>
        </div>
    );
}
