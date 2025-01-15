import { OlaMapsApiResponse } from "@instapark/types";
import { axios, Request, Response } from "@instapark/utils"

const apiKey = "4txhcXV6VGU9Onf5RCWGlAr8Gru7grfrIrsRvE36";

export const autoComplete = async (req: Request, res: Response) => {
    const { q } = req.params;

    if (!q || typeof q !== "string") {
        res.status(400).json({ error: "Invalid or missing query parameter 'q'." });
        return;
    }

    try {
        const response = await axios.get<OlaMapsApiResponse>(
            `https://api.olamaps.io/places/v1/autocomplete`,
            { params: { input: q, api_key: apiKey } }
        );

        const formattedData = response.data.predictions.map((p) => {
            const parts = p.description.split(",");
            return {
                location: p.description,
                lat: p.geometry.location.lat,
                lng: p.geometry.location.lng,
                country: parts.at(parts.length - 1),
                pincode: parts.at(parts.length - 2),
                state: parts.at(parts.length - 3),
                district: parts.at(parts.length - 4),
                taluk: parts.at(parts.length - 5),
                locality: parts.at(parts.length - 6),
                "sub-locality": parts.at(parts.length - 7),
                street: parts.at(parts.length - 8),
                name: parts.slice(0, parts.length - 8)
            };
        });
        res.status(200).json(formattedData);
    } catch (error) {
        res.status(500).json({ error: "Internal server error.", details: error });
    }
};

export const geoCode = async (req: Request, res: Response) => {
    const { q } = req.params;

    if (!q || typeof q !== "string") {
        res.status(400).json({ error: "Invalid or missing query parameter 'q'." });
        return;
    }

    try {
        const response = await axios.get(
            `https://api.olamaps.io/places/v1/geocode`,
            { params: { address: q, language: "hi", api_key: apiKey } }
        );

        const formattedData = response.data.geocodingResults.map((r: any) => {
            const parts = r.formatted_address.split(",");
            return {
                location: r.formatted_address,
                lat: r.geometry.location.lat,
                lng: r.geometry.location.lng,
                country: parts.at(parts.length - 1),
                pincode: parts.at(parts.length - 2),
                state: parts.at(parts.length - 3),
                district: parts.at(parts.length - 4),
                taluk: parts.at(parts.length - 5),
                locality: parts.at(parts.length - 6),
                "sub-locality": parts.at(parts.length - 7),
                street: parts.at(parts.length - 8),
                name: r.name
            };
        });

        res.status(200).json(formattedData);
    } catch (error) {
        res.status(500).json({ error: "Internal server error.", details: error });
    }
};

export const reverseGeoCode = async (req: Request, res: Response) => {
    const { latlng } = req.params;

    if (!latlng) {
        res.status(400).json({ error: "Invalid or missing query parameter 'latlng'." });
        return;
    }

    try {
        const response = await axios.get(
            `https://api.olamaps.io/places/v1/reverse-geocode`,
            { params: { latlng, api_key: apiKey } }
        );

        const formattedData = response.data.results.map((r: any) => {
            const parts = r.formatted_address.split(",");
            return {
                location: r.formatted_address,
                lat: r.geometry.location.lat,
                lng: r.geometry.location.lng,
                country: parts.at(parts.length - 1),
                pincode: parts.at(parts.length - 2),
                state: parts.at(parts.length - 3),
                district: parts.at(parts.length - 4),
                taluk: parts.at(parts.length - 5),
                locality: parts.at(parts.length - 6),
                "sub-locality": parts.at(parts.length - 7),
                street: parts.at(parts.length - 8),
                name: r.name
            };
        });

        res.status(200).json(formattedData);
    } catch (error) {
        res.status(500).json({ error: "Internal server error.", details: error });
    }
};

export const directions = async (req: Request, res: Response) => {
    const { origin, destination } = req.params;

    if (!origin || !destination) {
        res.status(400).json({ error: "Origin and Destination are required." });
        return;
    }

    try {
        const response = await axios.post(
            `https://api.olamaps.io/routing/v1/directions`,
            null,
            { params: { origin, destination, api_key: apiKey } }
        );

        const formattedData = response.data.routes[0].legs[0].steps;

        res.status(200).json(formattedData);
    } catch (error) {
        res.status(500).json({ error: "Internal server error.", details: error });
    }
};
