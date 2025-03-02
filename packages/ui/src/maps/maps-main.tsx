'use client';

import React from 'react';
import {
	GeolocateControl,
	GeolocateResultEvent,
	Map as Maplibre,
	Marker,
	NavigationControl,
} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import {
	AppDispatch,
	reverseGeocodeLocation,
	useDispatch,
} from '@instapark/state';
import { ParkingCircle } from 'lucide-react';

const BENGALURU = { lat: 12.9716, lng: 77.5946 };

export type MapProps = {
	maxZoom?: number;
	location?: { lat: number; lng: number };
};

export const MapsMain = ({ location, maxZoom }: MapProps) => {
	const mapLocation = location || BENGALURU;
	const dispatch = useDispatch<AppDispatch>();
	const onGeoLocate = (e: GeolocateResultEvent) => {
		dispatch(reverseGeocodeLocation([e.coords.latitude, e.coords.longitude]));
	};

	return (
		<Maplibre
			maxZoom={maxZoom || 22}
			mapLib={maplibregl}
			attributionControl={false}
			initialViewState={{
				latitude: mapLocation.lat,
				longitude: mapLocation.lng,
				zoom: 12,
			}}
			style={{
				width: '100%',
				height: '90vh',
				borderRadius: '12px',
			}}
			mapStyle={process.env.NEXT_PUBLIC_MAP_STYLE_URL!}
		>
			<GeolocateControl onGeolocate={onGeoLocate} />
			<NavigationControl position="top-right" />
			{location && (
				<Marker
					latitude={mapLocation.lat}
					longitude={mapLocation.lng}
					anchor="bottom"
				>
					<ParkingCircle className="h-16 w-16 fill-blue-500 dark:text-black" />
				</Marker>
			)}
		</Maplibre>
	);
};
