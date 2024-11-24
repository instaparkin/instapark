"use client";

import {
  GeolocateControl,
  GeolocateResultEvent,
  Map as Maplibre,
  Marker,
  MarkerDragEvent,
  NavigationControl,
  Source,
  Layer,
  Popup,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import { CiMapPin } from "react-icons/ci";
import { AppDispatch, fetchGeoLocations, RootState, useDispatch, useSelector } from "@instapark/state";
import { useEffect, useState } from "react";

export type MapProps = {
  id: string;
};

export const Map = ({ id }: MapProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { geoLocations: locations } = useSelector((state: RootState) => state.maps);

  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [routes, setRoutes] = useState<GeoJSON.FeatureCollection[]>([]);
  const [routeInfo, setRouteInfo] = useState<{ distance: number; duration: number }[]>([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number | null>(null);
  const [startPoint, setStartPoint] = useState<[number, number] | null>(null);
  const [endPoint, setEndPoint] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (locations.length > 0) {
      setViewport({
        latitude: locations[0]?.geometry.coordinates[1] as number,
        longitude: locations[0]?.geometry.coordinates[0] as number,
      });
    }
  }, [locations]);

  const fetchRoutes = async (start: [number, number], end: [number, number]) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.join(",")};${end.join(",")}?alternatives=true&geometries=geojson&overview=full`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      const fetchedRoutes: GeoJSON.FeatureCollection[] = data.routes.map((route: any) => ({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: route.geometry,
            properties: {},
          },
        ],
      }));

      const fetchedRouteInfo = data.routes.map((route: any) => ({
        distance: route.distance, // Distance in meters
        duration: route.duration, // Duration in seconds
      }));

      setRoutes(fetchedRoutes);
      setRouteInfo(fetchedRouteInfo);
      setSelectedRouteIndex(0); // Select the first route by default
    }
  };

  const onDragEnd = (event: MarkerDragEvent, isStart: boolean) => {
    const { lngLat } = event;
    const newPoint: [number, number] = [lngLat.lng, lngLat.lat];
    if (isStart) {
      setStartPoint(newPoint);
    } else {
      setEndPoint(newPoint);
    }
    if (startPoint && endPoint) {
      fetchRoutes(startPoint, endPoint);
    }
  };

  const onGeoLocate = (e: GeolocateResultEvent) => {
    dispatch(fetchGeoLocations(`https://photon.komoot.io/reverse?lon=${e.coords.longitude}&lat=${e.coords.latitude}`));
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
    >
      <GeolocateControl onGeolocate={onGeoLocate} />
      {locations.length > 0 && (
        <>
          <Marker
            draggable
            longitude={startPoint ? startPoint[0] : viewport.longitude}
            latitude={startPoint ? startPoint[1] : viewport.latitude}
            onDragEnd={(e) => onDragEnd(e, true)}
          >
            <CiMapPin size={40} className="text-blue-500" />
          </Marker>
          <Marker
            draggable
            longitude={endPoint ? endPoint[0] : viewport.longitude + 0.01}
            latitude={endPoint ? endPoint[1] : viewport.latitude + 0.01}
            onDragEnd={(e) => onDragEnd(e, false)}
          >
            <CiMapPin size={40} className="text-red-500" />
          </Marker>
        </>
      )}
      {routes.map((route, index) => (
        <Source key={index} id={`route-${index}`} type="geojson" data={route}>
          <Layer
            id={`route-line-${index}`}
            type="line"
            paint={{
              "line-color": index === selectedRouteIndex ? "#007aff" : "#999999",
              "line-width": 4,
              "line-opacity": index === selectedRouteIndex ? 1 : 0.5,
            }}
          />
        </Source>
      ))}
      {selectedRouteIndex !== null && (
        <Popup
          longitude={viewport.longitude}
          latitude={viewport.latitude}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setSelectedRouteIndex(null)}
          anchor="top"
        >
          <div>
            <p>
              <strong>Distance:</strong> {(routeInfo[selectedRouteIndex]?.distance / 1000).toFixed(2)} km
            </p>
            <p>
              <strong>Duration:</strong> {(routeInfo[selectedRouteIndex]?.duration / 60).toFixed(2)} min
            </p>
          </div>
        </Popup>
      )}
      <NavigationControl position="top-right" />
      <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
        {routes.map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 m-1 ${index === selectedRouteIndex ? "bg-blue-500 text-white border border-white" : "bg-gray-200"}`}
            onClick={() => setSelectedRouteIndex(index)}
          >
            Route {index + 1}
          </button>
        ))}
      </div>
    </Maplibre>
  );
};
