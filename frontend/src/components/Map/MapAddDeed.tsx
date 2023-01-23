import React, {useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import './MapAddDeed.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

mapboxgl.accessToken = 'pk.eyJ1IjoiZmFuZ2Zhbmd3IiwiYSI6ImNsZDRpODFpazBzd2kzcHByY2NsbTM4a2YifQ.HwaQPqclw2a40Vn0t1iNMQ';
type MapAddDeedProps = {
    addGeoCode(len: number, lat: number, address: string): void
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
            center: [11.9333, 48.4667],
            zoom: 13
        });

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        })

        geocoder.on('result', (e) => {
            console.log(e.center[0], e.center[1], e.text);
            props.addGeoCode(e.center[0], e.center[1], e.text)

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