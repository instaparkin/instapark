import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import stateConfig from "../../state-config.json"
import { Listing } from "@instapark/types"

export interface SearchListingsProps {
    query_by: string[];
    collections: {
        q: string
        name: string;
        filter_by?: string;
    }[];
}

interface InitialState {
    listingData: Listing[];
    loading: boolean;
    error: string | null;
}

const initialState: InitialState = {
    listingData: [],
    loading: false,
    error: null,
};

export const searchListings = createAsyncThunk<Listing[], SearchListingsProps, { rejectValue: string }>(
    "search/listings",
    async ({ query_by, collections }, { rejectWithValue }) => {
        try {
            const payload = {
                searches: collections.map((c) => ({
                    collection: c.name,
                    q: c.q,
                    filter_by: c.filter_by,
                })),
            };

            const response = await fetch(`${stateConfig.routes.LISTINGS_SEARCH_ROUTE}/${query_by.join(",")}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }

            const result = await response.json();
            console.log(result);
            const listings: Listing[] = result?.results[0]?.hits?.map((hit: any) => hit.document) || [];
            return listings;
        } catch (error) {
            return rejectWithValue((error as Error)?.message || "Unknown error occurred");
        }
    }
);

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchListings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchListings.fulfilled, (state, action: PayloadAction<Listing[]>) => {
                state.loading = false;
                state.listingData = action.payload;
            })
            .addCase(searchListings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch listings";
            });
    },
});

export default searchSlice.reducer;
