import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import './MapBG.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

mapboxgl.accessToken = 'pk.eyJ1IjoiZmFuZ2Zhbmd3IiwiYSI6ImNsZDRpODFpazBzd2kzcHByY2NsbTM4a2YifQ.HwaQPqclw2a40Vn0t1iNMQ';

export default function App() {


    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(11.9333);
    const [lat, setLat] = useState(48.4667);
    const [zoom, setZoom] = useState(13);
    const [marks, setMarks] = useState<boolean>(false)

    const geoJson = {
        type: 'DeedCollection',
        deeds: [
            {
                type: 'Deed',
                description: 'something',
                address: {
                    type: 'Address',//Point
                    address: 'Freiwillige Feuerwehr',
                    name: 'Freiwillige Feuerwehr',
                    coordinates: {
                        lng: 11.937110,
                        lat: 48.469873
                    }
                },
                karmaPoints: '3',
                deedStatus: "CREATED",
                author: "",
                maker: ""

            },
            {
                type: 'Deed',
                description: 'something',
                address: {
                    type: 'Address',//Point
                    address: 'Freiwillige Feuerwehr',
                    name: 'Freiwillige Feuerwehr',
                    coordinates: {
                        lng: 11.943123,
                        lat: 48.476020
                    }
                },
                karmaPoints: '10',
                deedStatus: "CREATED",
                author: "",
                maker: ""

            }

        ]
    }

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


        map.current.addControl(
            geocoder
        );


    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            if (!map.current) return;
            setLng(parseFloat(map.current.getCenter().lng.toFixed(4)));
            setLat(parseFloat(map.current.getCenter().lat.toFixed(4)));
            setZoom(parseFloat(map.current.getZoom().toFixed(2)));
        });


    });

    useEffect(() => {
        if (!marks) {


            for (const deed of geoJson.deeds) {

                // create a HTML element for each feature
                const el = document.createElement('div');
                el.className = 'marker';

                if (map.current) {

                    new mapboxgl.Marker(el)
                        .setLngLat([deed.address.coordinates.lng, deed.address.coordinates.lat])
                        .setPopup(
                            new mapboxgl.Popup({offset: 25}) // add popups
                                .setHTML(
                                    `<h3>${deed.karmaPoints}</h3>
                                        <p>${deed.description}</p>`
                                )
                        )
                        .addTo(map.current)
                    setMarks(true)
                }
            }
        }
    }, [geoJson])


    return (
        <div>
            <div ref={mapContainer} className="map-container"/>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div>

            </div>
        </div>
    );
}