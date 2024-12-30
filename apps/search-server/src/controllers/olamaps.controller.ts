interface Prediction extends Record<string, unknown> {
    description: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
}

interface ApiResponse {
    predictions: Prediction[];
}

export const autoComplete = async (req, res) => {
    const { q } = req.params;

    if (!q || typeof q !== "string") {
        return res.status(400).json({ error: "Invalid or missing query parameter 'q'." });
    }

    try {
        const response = await fetch(
            `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(q)}&api_key=4txhcXV6VGU9Onf5RCWGlAr8Gru7grfrIrsRvE36`
        );

        if (!response.ok) {
            return res.status(response.status).json({ error: `API error: ${response.statusText}` });
        }

        const data: ApiResponse = await response.json();

        const formattedData = data.predictions.map((p) => {
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
            }
        });
        return res.status(200).json(formattedData);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error.", details: error.message });
    }
};

export const geoCode = async (req, res) => {
    const { q } = req.params;

    if (!q || typeof q !== "string") {
        return res.status(400).json({ error: "Invalid or missing query parameter 'q'." });
    }

    try {
        const response = await fetch(
            `https://api.olamaps.io/places/v1/geocode?address=${encodeURIComponent(q)}&language=hi&api_key=4txhcXV6VGU9Onf5RCWGlAr8Gru7grfrIrsRvE36`
        );

        if (!response.ok) {
            return res.status(response.status).json({ error: `API error: ${response.statusText}` });
        }

        const data = await response.json();

        const formattedData = await data.geocodingResults.map(r => {
            const parts = r?.formatted_address.split(",");
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
            }
        })

        return res.status(200).json(formattedData);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error.", details: error.message });

    }
}

export const reverseGeoCode = async (req, res) => {
    const { latlng } = req.params;

    if (!latlng) {
        return res.status(400).json({ error: "Invalid or missing query parameter 'q'." });
    }

    try {
        const response = await fetch(
            `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${latlng}&api_key=4txhcXV6VGU9Onf5RCWGlAr8Gru7grfrIrsRvE36`
        );

        if (!response.ok) {
            return res.status(response.status).json({ error: `API error: ${response.statusText}` });
        }

        const data = await response.json();

        const formattedData = await data.results.map(r => {
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
            }
        })

        return res.status(200).json(formattedData);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error.", details: error.message });

    }
}

export const directions = async (req, res) => {
    const { origin, destination } = req.params;

    if (!origin && !destination) {
        return res.status(400).json({ error: "Origin and Destination are required" });
    }

    try {
        const response = await fetch("https://api.olamaps.io/routing/v1/directions?origin=18.76029027465273,73.3814242364375&destination=18.73354223011708,73.44587966939002&api_key=4txhcXV6VGU9Onf5RCWGlAr8Gru7grfrIrsRvE36",{
            method : "POST"
        })
        if (!response.ok) {
            return res.status(response.status).json({ error: `API error: ${response.statusText}` });
        }

        const data = await response.json();

        const formattedData = data.routes[0].legs[0].steps

        return res.status(200).json(formattedData);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error.", details: error.message });
    }
}