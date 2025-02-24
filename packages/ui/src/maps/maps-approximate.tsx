"use client";

import React from "react";
import { Map as Maplibre, Marker, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import { ParkingCircle } from "lucide-react";

export type MapsApproximateProps = {
    location?: { lat: number; lng: number };
};

export const MapsApproximate = ({ location }: MapsApproximateProps) => {
    const defaultLocation = { lat: 12.9716, lng: 77.5946 };
    const mapLocation = location || defaultLocation;
    return (
        <Maplibre
            maxZoom={14}
            mapLib={maplibregl}
            attributionControl={false}
            style={{
                width: "100%",
                height: "90vh",
                borderRadius: "12px",
            }}
            initialViewState={{
                latitude: mapLocation.lat,
                longitude: mapLocation.lng,
                zoom: 12,
            }}
            mapStyle={"https://utfs.io/f/UMgDcGP2ujLzttNyuH0RaI6hWs0JoQclYfXvnANMEm9LGjzy"}
        >
            <NavigationControl position="top-right" />
            <Marker latitude={mapLocation.lat} longitude={mapLocation.lng} anchor="bottom">
                <ParkingCircle className="w-16 h-16  fill-blue-500 dark:text-black" />
            </Marker>
        </Maplibre>
    );
};
