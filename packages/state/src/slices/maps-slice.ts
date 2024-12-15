import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Feature, FeatureCollection } from "geojson"

export interface MapDetailsFormatted {
    location: string
    lat: number
    lng: number
}

/**
 * Generates autocomplete suggestions using Ola map API
 * Ola maps Documentation
 * https://maps.olakrutrim.com/docs/places-apis/autocomplete-api
 */
export const autoCompleteLocations = createAsyncThunk(
    "maps/autocomplete",
    async (query): Promise<MapDetailsFormatted[]> => {
        const response = await fetch(`https://api.olamaps.io/places/v1/autocomplete?input=${query}&api_key=${process.env.OLA_MAPS_API_KEY}`)
        const data = await response.json();
        const locations: MapDetailsFormatted[] = await data.predictions.map((prediction: Record<string, unknown>) => {
            return ({ location: prediction.description, lat: prediction.lat, lng: prediction.lng })
        })
        return locations
    })

export const routeLocations = createAsyncThunk(
    "maps/route-locations",
    () => {

    })

export const reverseGeocodeLocation = createAsyncThunk(
    "maps/reverse-geocode",
    () => {

    })
export interface CounterState {

}

const initialState: CounterState = {
};

export const mapsSlice = createSlice({
    name: 'maps',
    initialState,
    reducers: {
    },
});

export const { } = mapsSlice.actions

export default mapsSlice.reducer