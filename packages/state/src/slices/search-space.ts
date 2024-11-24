import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Feature, FeatureCollection } from "geojson"

export const fetchGeoLocations = createAsyncThunk<
    Feature<GeoJSON.Point>[],
    string
>("fetchGeoLocations", async function (url) {
    const results = await fetch(url);
    const data: FeatureCollection = await results.json();
    return data.features.filter((feature) => feature.geometry.type === 'Point') as Feature<GeoJSON.Point>[];
});

export interface CounterState {
    geoLocations: Feature<GeoJSON.Point>[]
    loading: boolean;
    error: string | null;
}

const initialState: CounterState = {
    geoLocations: [],
    loading: false,
    error: null,
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGeoLocations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGeoLocations.fulfilled, (state, action) => {
                state.loading = false;
                state.geoLocations = action.payload;
            })
            .addCase(fetchGeoLocations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export const {  } = counterSlice.actions

export default counterSlice.reducer