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

interface IAutoCompleteLocations {
    q: string
}

export async function autoCompleteLocations({ q }: IAutoCompleteLocations) {
    try {
        const response = await fetch(
            `https://api.olamaps.io/places/v1/autocomplete?input=${q}&api_key=4txhcXV6VGU9Onf5RCWGlAr8Gru7grfrIrsRvE36`
        );

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data: ApiResponse = await response.json();
        
        return data
    } catch (error) {
        throw error
    }
}