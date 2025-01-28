"use client";

import React, { useEffect, useState } from 'react';
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
import { Heart, X } from 'lucide-react';
import { AppDispatch, reverseGeocodeLocation, RootState, useDispatch, useSelector } from "@instapark/state";
import { ListingCard } from '../components/listing-card';
import { Listing } from '@instapark/types';
import { Button } from '../components/button';
import { Badge } from '../components/badge';

export type MapProps = {
  listing?: Listing;
  listings?: Listing[];
  onListingSelect?: (listing: Listing) => void;
  initialZoom?: number;
};

export const MapsMain = ({ listing, listings = [], onListingSelect, initialZoom = 4 }: MapProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const markersData = listing ? [listing] : listings;

  const [viewport, setViewport] = useState({
    latitude: listing?.latitude || 20.5937,
    longitude: listing?.longitude || 78.9629,
    zoom: listing ? 12 : initialZoom,
  });

  const [selectedListing, setSelectedListing] = useState<Listing | null>(listing || null);
  const [showPopup, setShowPopup] = useState<boolean>(!!listing);

  useEffect(() => {
    if (listing) {
      setViewport({
        latitude: listing.latitude,
        longitude: listing.longitude,
        zoom: 12,
      });
      setSelectedListing(listing);
      setShowPopup(true);
    }
  }, [listing]);

  const onMarkerClick = (clickedListing: Listing) => {
    setSelectedListing(clickedListing);
    setShowPopup(true);
    setViewport({
      latitude: clickedListing.latitude,
      longitude: clickedListing.longitude,
      zoom: 12,
    });
    onListingSelect?.(clickedListing);
  };

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
      {...viewport}
      onMove={evt => setViewport(evt.viewState)}
    >

      {markersData.length > 0 && markersData.map((markerListing) => (
        <Marker
          onClick={() => onMarkerClick(markerListing)}
          key={markerListing.id}
          longitude={markerListing.longitude}
          latitude={markerListing.latitude}
          anchor="center"
        >
          <Badge
            variant="map"
            style={{ cursor: 'pointer' }}
          >
            {markerListing.basePrice}
          </Badge>
        </Marker>

      ))}

      {showPopup && selectedListing && (
        console.log('Rendering Popup:', selectedListing),
        <Popup
          longitude={selectedListing.longitude}
          latitude={selectedListing.latitude}
          onClose={() => setShowPopup(false)}
        >
          <div className='w-full'>
            <ListingCard listing={selectedListing} />
          </div>
        </Popup>
      )}


      <GeolocateControl onGeolocate={onGeoLocate} />
      <NavigationControl position="top-right" />
    </Maplibre>
  );
};
