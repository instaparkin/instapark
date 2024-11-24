"use client";

import { useMap } from "react-map-gl/maplibre";

export type FlyToButtonProps = {
    children: React.ReactNode
    flyTo: [number, number]
};

export function FlyToButton({ children, flyTo }: FlyToButtonProps) {
    const { addSpaceMap } = useMap();
    const onClick = () => {
        if (addSpaceMap) {
            addSpaceMap.flyTo({ center: flyTo, zoom: 16.5 });
        } else {
            console.error("Map instance not found.");
        }
    };

    return <div onClick={onClick}>{children}</div>;
}
