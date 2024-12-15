"use client";

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
import { AppDispatch, fetchGeoLocations, RootState, useDispatch, useSelector } from "@instapark/state";
import { useEffect, useState } from "react";
import { MapProps } from "./maps-types";

export const Map = ({ id }: MapProps) => {

  const dispatch = useDispatch<AppDispatch>();

  const { geoLocations: locations } = useSelector((state: RootState) => state.maps);

  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (locations.length > 0) {
      setViewport({
        latitude: locations[0]?.geometry.coordinates[1] as number,
        longitude: locations[0]?.geometry.coordinates[0] as number,
      })
    }
  }, [locations]);

  const onDragEnd = (event: MarkerDragEvent) => {
    const { lngLat } = event;
    setViewport((prev) => ({
      ...prev,
      latitude: lngLat.lat,
      longitude: lngLat.lng,
    }));
    dispatch(fetchGeoLocations(`https://photon.komoot.io/reverse?lon=${lngLat.lng}&lat=${lngLat.lat}`));
  };

  const onGeoLocate = (e: GeolocateResultEvent) => {
    dispatch(fetchGeoLocations(`https://photon.komoot.io/reverse?lon=${e.coords.longitude}&lat=${e.coords.latitude}`))
      .catch((error) => console.error("Geolocation fetch failed:", error));
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
        process.env.MAP_STYLE_URL
      }
    >
      <GeolocateControl onGeolocate={onGeoLocate} />
      {
        locations.length > 0 && (
          <Marker
            onDragEnd={onDragEnd}
            draggable
            longitude={viewport.longitude as number}
            latitude={viewport.latitude as number}
          >
            <CiMapPin size={40} className="text-black " />
          </Marker>
        )
      }
      <NavigationControl position="top-right" />
    </Maplibre>
  );
};