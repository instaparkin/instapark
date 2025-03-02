'use client';

import React from 'react';
import { MapProvider as MapLibreProvider } from 'react-map-gl/maplibre';

export const MapsProvider = ({ children }: { children: React.ReactNode }) => {
	return <MapLibreProvider>{children}</MapLibreProvider>;
};
