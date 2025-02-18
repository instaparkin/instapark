"use client";

import React from 'react';
import {
  GeolocateControl,
  GeolocateResultEvent,
  Map as Maplibre,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import { AppDispatch, reverseGeocodeLocation, useDispatch } from "@instapark/state";
import { Listing } from '@instapark/types';

export type MapProps = {
  listing?: Listing;
  listings?: Listing[];
  onListingSelect?: (listing: Listing) => void;
  initialZoom?: number;
};

export const MapsMain = () => {
  const dispatch = useDispatch<AppDispatch>();

  const onGeoLocate = (e: GeolocateResultEvent) => {
    dispatch(reverseGeocodeLocation([e.coords.latitude, e.coords.longitude]));
  };

  return (
    <Maplibre
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
    >
      <GeolocateControl
        onGeolocate={onGeoLocate}
      />
      <NavigationControl
        position="top-right"
      />
    </Maplibre>
  );
};
