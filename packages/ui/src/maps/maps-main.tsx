"use client";

import React, { useEffect, useState } from 'react';
import {
  GeolocateControl,
  GeolocateResultEvent,
  Map as Maplibre,
  Marker,
  MarkerDragEvent,
  NavigationControl,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import { CiMapPin } from "react-icons/ci";
import { AppDispatch, reverseGeocodeLocation, RootState, useDispatch, useSelector } from "@instapark/state";

export type MapProps = {
  id: string;
  initialLat?: number;
  initialLng?: number;
};

export const MapsMain = ({ id }: MapProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { autocomplete: locations } = useSelector((state: RootState) => state.maps);

  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 0,
  });

  useEffect(() => {
    if (locations.length > 0) {
      const location = locations[0];
      setViewport({
        latitude: location?.lat as number,
        longitude: location?.lng as number,
        zoom: 16.5,
      });
    }
  }, [locations]);

  const onDragEnd = (event: MarkerDragEvent) => {
    const { lngLat } = event;
    setViewport((prev) => ({
      ...prev,
      latitude: lngLat.lat,
      longitude: lngLat.lng,
    }));
    dispatch(reverseGeocodeLocation([lngLat.lat, lngLat.lng]));
  };

  const onGeoLocate = (e: GeolocateResultEvent) => {
    dispatch(reverseGeocodeLocation([e.coords.latitude, e.coords.longitude]));
  };

  return (
    <Maplibre
      id={id}
      mapLib={maplibregl}
      attributionControl={false}
      style={{
        width: "100%",
        height: "90vh",
        borderRadius: "12px",
      }}
      mapStyle={
        "https://utfs.io/f/UMgDcGP2ujLzttNyuH0RaI6hWs0JoQclYfXvnANMEm9LGjzy"
      }
      zoom={viewport.zoom}
      latitude={viewport.latitude}
      longitude={viewport.longitude}
    >
      <GeolocateControl onGeolocate={onGeoLocate} />
      {locations.length > 0 && (
        <Marker
          onDragEnd={onDragEnd}
          draggable
          longitude={viewport.longitude}
          latitude={viewport.latitude}
        >
          <CiMapPin size={40} className="text-black" />
        </Marker>
      )}
      <NavigationControl position="top-right" />
    </Maplibre>
  );
};
