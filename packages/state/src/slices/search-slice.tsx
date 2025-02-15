import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import stateConfig from "../../state-config.json"
import { Listing, ListingSearch } from "@instapark/types"

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

export const searchListings = createAsyncThunk<Listing[], ListingSearch, { rejectValue: string }>(
    "search/listings",
    async ({ q, vehicleType, page, startDate, endDate }, { rejectWithValue }) => {
        try {
            const payload = {
                searches: collections.map((c) => ({
                    collection: c.name,
                    q: c.q,
                    filter_by: c.filter_by,
                    page: c.page
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
            const listings: Listing[] = result?.results[0]?.hits?.map((hit: { document: Listing; }) => hit.document) || [];
            return listings;
        } catch (error) {
            return rejectWithValue('Unknown error occurred: ' + error);
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
