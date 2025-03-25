import React, { useEffect, useState } from "react";
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { get_barangay_service } from "@/app/services/demographic-data-service";

const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

function GoogleMapComponent() {
    const [marker, setMarker] = useState([
        {
            longitude: 0,
            latitude: 0,
        },
    ]);

    async function get_barangay(params) {
        const res = await get_barangay_service();
        console.log('dadwa',  res.response.map((res) => ({
            lng: parseFloat(res.lng),
            lat: parseFloat(res.lat),
        })))
        setMarker(
            res.response.map((res) => ({
                lng: parseFloat(res.lng),
                lat: parseFloat(res.lat),
            }))
        );
        return res;
    }
    useEffect(() => {
        get_barangay();
    }, []);
    const containerStyle = {
        width: "100vw",
        height: "100vh",
    };

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: API_KEY,
    });

    // async function searchCoordinates(address, city, state, zip) {
    //     const fullAddress = `${address}, ${city}, ${state} ${zip}`;
    //     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    //         fullAddress
    //     )}&key=${API_KEY}`;

    //     try {
    //         const response = await fetch(url);
    //         const data = await response.json();

    //         if (data.results.length > 0) {
    //             const location = data.results[0].geometry.location;
    //             return { latitude: location.lat, longitude: location.lng };
    //         } else {
    //             throw new Error("No results found for the given address.");
    //         }
    //     } catch (error) {
    //         console.log("Error searching coordinates:", error);
    //         return null;
    //     }
    // }
    // useEffect(() => {
    //     async function fetchData() {
    //         const coordinates = await searchCoordinates(
    //             ticket.address,
    //             ticket.city,
    //             ticket.state,
    //             ticket.zip_code
    //         );
    //         setMarker(coordinates);
    //     }
    //     fetchData();
    // }, []);

    // function calculateDistance(lat1, lon1, lat2, lon2) {
    //     const R = 6371e3; // Earth radius in meters
    //     const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    //     const φ2 = (lat2 * Math.PI) / 180;
    //     const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    //     const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    //     const a =
    //         Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    //         Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    //     const distance = R * c; // Distance in meters
    //     return distance;
    // }

    // Function to calculate estimated minutes of ride based on distance and average speed
    // function calculateMinutesOfRide(distance) {
    //     const averageSpeed = 30; // Assume average speed in km/h
    //     const distanceInKm = distance / 1000; // Convert distance to kilometers
    //     const timeInHours = distanceInKm / averageSpeed; // Time in hours
    //     const timeInMinutes = timeInHours * 60; // Time in minutes

    //     // If time is 59 minutes or more, round up to the nearest hour
    //     if (timeInMinutes >= 59) {
    //         return Math.ceil(timeInMinutes / 60) + " hour(s)";
    //     } else {
    //         return Math.round(timeInMinutes) + " mins";
    //     }
    // }

    // function formatMeters(distance) {
    //     if (distance > 999) {
    //         const distanceInKm = distance / 1000;
    //         return distanceInKm.toFixed(1) + "km";
    //     } else {
    //         return distance.toFixed(0) + "m";
    //     }
    // }
    

    const center = {
        lat: 10.5946,
        lng: 123.4813,
    };

    return isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
            {/* <InfoWindow
                position={{ lat: marker.latitude, lng: marker.longitude }}
            >
                <div className="flex flex-col">
                    <div>
                        Customer: {ticket.fname} {ticket.lname}
                    </div>
                    <div>Email: {ticket.email}</div>
                    <div>Contact: {ticket.phone}</div>
                    <div>
                        Address: {ticket.address} {ticket.city} {ticket.state}{" "}
                        {ticket.country} {ticket.zip_code}
                    </div>
                </div>
            </InfoWindow> */}
            {/* {ascs.map((res) => (
                <Marker
                    key={res.id}
                    position={{ lat: res.lat, lng: res.lng }}
                    onClick={() => handleMarkerClick(res)}
                >
                    {selectedMarker === res && (
                        <InfoWindow position={{ lat: res.lat, lng: res.lng }}>
                            <div className="flex flex-col">
                                <div>{res.name}</div>
                                <div>Email: {res.email}</div>
                                <div>Contact: {res.phone}</div>
                                <div className="flex gap-1">
                                    Meter:{" "}
                                    <div className="text-red-500">
                                        {formatMeters(
                                            calculateDistance(
                                                marker.latitude,
                                                marker.longitude,
                                                res.lat,
                                                res.lng
                                            )
                                        )}
                                    </div>
                                </div>
                                <div>
                                    Minute of Ride:{" "}
                                    {calculateMinutesOfRide(
                                        calculateDistance(
                                            marker.latitude,
                                            marker.longitude,
                                            res.lat,
                                            res.lng
                                        )
                                    )}
                                </div>
                                <div>
                                    Address: {res.address} {res.city}{" "}
                                    {res.state} {res.country} {res.zip_code}
                                </div>
                            </div>
                        </InfoWindow>
                    )}
                </Marker>
            ))} */}

            {marker.map((res) => {
                return (
                    <Marker
                        position={res}
                        onDragEnd={(e) => handleMarkerClick(e)}
                    ></Marker>
                );
            })}
        </GoogleMap>
    ) : (
        <></>
    );
}

export default GoogleMapComponent;
