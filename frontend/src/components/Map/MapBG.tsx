import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './MapBG.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZmFuZ2Zhbmd3IiwiYSI6ImNsZDRpODFpazBzd2kzcHByY2NsbTM4a2YifQ.HwaQPqclw2a40Vn0t1iNMQ';

export default function App() {


    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    const [marks, setMarks] = useState<boolean>(false)

    const geoJson = {
        type: 'DeedCollection',
        deeds: [
            {
                type: 'Deed',
                geometry: {
                    type: 'Point',
                    coordinates: [48.469873, 11.937110]
                },
                properties: {
                    karmaPoints: '2',
                    description: 'Freiwillige Feuerwehr'
                }
            },
            {
                type: 'Deed',
                geometry: {
                    type: 'Point',
                    coordinates: [48.476020, 11.943123]
                },
                properties: {
                    karmaPoints: '3',
                    description: 'REWE'
                }
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


            for (const feature of geoJson.deeds) {

                // create a HTML element for each feature
                const el = document.createElement('div');
                el.className = 'marker';

                if (feature.geometry.coordinates.length !== 2) {
                    console.error("Expected two coordinates for " + feature)
                    continue
                }
                if (map.current) {
                    console.log("adding marker...")

                    new mapboxgl.Marker(el)
                        .setLngLat([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
                        .setPopup(
                            new mapboxgl.Popup({offset: 25}) // add popups
                                .setHTML(
                                    `<h3>${feature.properties.karmaPoints}</h3><p>${feature.properties.description}</p>`
                                )
                        )
                        .addTo(map.current)
                    setMarks(true)
                }
            }
        }
    }, [geoJson])
    if (map.current) {
        map.current.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
// When active the map will receive updates to the device's location as it changes.
                trackUserLocation: true,
// Draw an arrow next to the location dot to indicate which direction the device is heading.
                showUserHeading: true
            })
        )
    }
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