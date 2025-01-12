"use client";

import React from "react";
import { MapCollection } from "react-map-gl/dist/esm/components/use-map";
import { MapInstance, useMap } from "react-map-gl/maplibre";

export type FlyToButtonProps<T extends MapInstance> = {
    children: React.ReactNode
    flyTo: [number, number],
    map? :  MapCollection<T>
};

export function MapsFlyToButton <T extends MapInstance>({ children, flyTo }: FlyToButtonProps<T>) {
    const { ListingsAddLocation } = useMap();
    const onClick = () => {
        if (ListingsAddLocation) {
            ListingsAddLocation.flyTo({ center: flyTo, zoom: 16.5 });
        } else {
            console.error("Map instance not found.");
        }
    };

    return <div onClick={onClick}>{children}</div>;
}
