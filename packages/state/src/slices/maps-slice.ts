import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/search/olamaps';

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
            const response = await fetch(`${API_BASE_URL}/autocomplete/${query}`);
            if (!response.ok) {
                throw new Error('Failed to fetch autocomplete data');
            }
            const data: MapData[] = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Unknown error occurred');
        }
    }
);

export const directions = createAsyncThunk<MapData[], { origin: number[]; destination: number[] }, ThunkApiConfig>(
    'maps/directions',
    async ({ origin, destination }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/directions/${origin}/${destination}`);
            if (!response.ok) {
                throw new Error('Failed to fetch directions data');
            }
            const data: MapData[] = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Unknown error occurred');
        }
    }
);

export const reverseGeocodeLocation = createAsyncThunk<MapData[], number[], ThunkApiConfig>(
    'maps/reverse-geocode',
    async (latlng, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/reverse-geocode/${latlng}`);
            if (!response.ok) {
                throw new Error('Failed to fetch reverse geocode data');
            }
            const data: MapData[] = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Unknown error occurred');
        }
    }
);

export const geocodeLocation = createAsyncThunk<MapData[], string, ThunkApiConfig>(
    'maps/geocode',
    async (q, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/geocode/${q}`);
            if (!response.ok) {
                throw new Error('Failed to fetch geocode data');
            }
            const data: MapData[] = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Unknown error occurred');
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
