import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface OlaMapsPrediction extends Record<string, unknown> {
    description: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
}

export interface OlaMapsApiResponse {
    predictions: OlaMapsPrediction[];
}

export interface OlaMapsGeocodingResult {
    formatted_address: string
}
const apiKey = process.env.NEXT_PUBLIC_OLA_MAPS_API_KEY!;

export type CodeLocationType = {
    formatted_address: string,
    geometry: {
        location:
        {
            lat: number,
            lng: number
        }
    },
    name: string
}

export interface MapData {
    [key: string]: unknown;
}

export interface MapsState {
    autocomplete: MapData[];
    directions: MapData[];
    reverseGeocode: MapData[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: MapsState = {
    autocomplete: [],
    directions: [],
    reverseGeocode: [],
    status: 'idle',
    error: null,
};

type ThunkApiConfig = {
    rejectValue: string;
};

export const autoCompleteLocations = createAsyncThunk<MapData[], string, ThunkApiConfig>(
    'maps/autocomplete',
    async (query, { rejectWithValue }) => {
        try {
            const response = await axios.get<OlaMapsApiResponse>(
                `https://api.olamaps.io/places/v1/autocomplete`,
                { params: { input: query, api_key: apiKey } }
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
            return formattedData;
        } catch (error) {
            return rejectWithValue('Unknown error occurred: ' + error);
        }
    }
);

export const directions = createAsyncThunk<MapData[], { origin: number[]; destination: number[] }, ThunkApiConfig>(
    'maps/directions',
    async ({ origin, destination }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `https://api.olamaps.io/routing/v1/directions`,
                null,
                { params: { origin, destination, api_key: apiKey } }
            );

            return response.data.routes[0].legs[0].steps;
        } catch (error) {
            return rejectWithValue('Unknown error occurred: ' + error);
        }
    }
);

export const reverseGeocodeLocation = createAsyncThunk<MapData[], number[], ThunkApiConfig>(
    'maps/reverse-geocode',
    async (latlng, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `https://api.olamaps.io/places/v1/reverse-geocode`,
                { params: { latlng, api_key: apiKey } }
            );

            return response.data.results.map((r: CodeLocationType) => {
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
        } catch (error) {
            return rejectWithValue('Unknown error occurred: ' + error);
        }
    }
);

export const geocodeLocation = createAsyncThunk<MapData[], string, ThunkApiConfig>(
    'maps/geocode',
    async (q, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `https://api.olamaps.io/places/v1/geocode`,
                { params: { address: q, language: "hi", api_key: apiKey } }
            );

            return response.data.geocodingResults.map((r: CodeLocationType) => {
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
        } catch (error) {
            return rejectWithValue('Unknown error occurred: ' + error);
        }
    }
);

export const mapsSlice = createSlice({
    name: 'maps',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(autoCompleteLocations.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(autoCompleteLocations.fulfilled, (state, action: PayloadAction<MapData[]>) => {
                state.status = 'succeeded';
                state.autocomplete = action.payload;
            })
            .addCase(autoCompleteLocations.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload || 'Unknown error occurred';
            })
            .addCase(directions.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(directions.fulfilled, (state, action: PayloadAction<MapData[]>) => {
                state.status = 'succeeded';
                state.directions = action.payload;
            })
            .addCase(directions.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload || 'Unknown error occurred';
            })
            .addCase(reverseGeocodeLocation.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(reverseGeocodeLocation.fulfilled, (state, action: PayloadAction<MapData[]>) => {
                state.status = 'succeeded';
                state.reverseGeocode = action.payload;
            })
            .addCase(reverseGeocodeLocation.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload || 'Unknown error occurred';
            })
            .addCase(geocodeLocation.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(geocodeLocation.fulfilled, (state, action: PayloadAction<MapData[]>) => {
                state.status = 'succeeded';
                state.reverseGeocode = action.payload;
            })
            .addCase(geocodeLocation.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload || 'Unknown error occurred';
            });
    },
});

export default mapsSlice.reducer;
