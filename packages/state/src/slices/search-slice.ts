import { Vehicle } from "@instapark/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ListingSearch {
    startDate: number | null;
    endDate: number | null;
    street: string | null;
    vehicleType: Vehicle;
}

const initialState: ListingSearch = {
    startDate: null,
    endDate: null,
    street: null,
    vehicleType: Vehicle.Bike,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<Partial<ListingSearch>>) => {
            return { ...state, ...action.payload };
        },
        resetSearch: () => initialState,
    },
});

export const { setSearch, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
