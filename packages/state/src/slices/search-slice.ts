import { Vehicle } from '@instapark/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ListingSearch {
	startDate: string;
	endDate: string;
	street: string | null;
	vehicleType: Vehicle;
}
/**
 * Utils to convert the date to the format of Date-Time input Field
 */
const formatDateTime = (date: Date) => date.toISOString().slice(0, 16);
const now = new Date();

const initialState: ListingSearch = {
	startDate: formatDateTime(now),
	endDate: formatDateTime(new Date(now.getTime() + 5 * 3600 * 1000)),
	street: null,
	vehicleType: Vehicle.Bike,
};

const searchSlice = createSlice({
	name: 'search',
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
