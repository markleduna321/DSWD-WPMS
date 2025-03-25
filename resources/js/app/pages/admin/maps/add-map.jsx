import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import { useEffect } from "react";

const containerStyle = {
    width: "100%",
    height: "400px",
};

const center = {
    lat: 10.5946,
    lng: 123.4813,
};

const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
function AddMap({ setNewAgent,newAgent }) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: API_KEY,
    });
    const [pin, setPin] = useState({
        lat:newAgent.lat,
        lng: newAgent.lng,
    });

    useEffect(()=>{
        setNewAgent({
            ...newAgent,
            lat:pin.lat,
            lng:pin.lng,
        })
    },[pin.lat,pin.lng])
    const [map, setMap] = React.useState(null);

    // const onLoad = React.useCallback(function callback(map) {
    //     // This is just an example of getting and using the map instance!!! don't just blindly copy!
    //     const bounds = new window.google.maps.LatLngBounds(center);
    //     map.fitBounds(bounds);
    //     setMap(map);
    // }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    function handleMarkerClick(e) {
        setPin({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
    }
    console.log("newAgent", newAgent);

    return  isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            // onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {/* Child components, such as markers, info windows, etc. */}
            <Marker
                position={pin}
                draggable
                onDragEnd={(e) => handleMarkerClick(e)}
            >
            </Marker>
        </GoogleMap>
    ) : (
        <></>
    );
}

export default React.memo(AddMap);
