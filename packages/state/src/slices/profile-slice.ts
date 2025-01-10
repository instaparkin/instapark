import { axios, logger } from "@instapark/utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type Fullname = {
    userId: string;
    firstname: string;
    lastname: string;
};

type ThunkApiConfig = {
    rejectValue: string;
};

export const profileFullname = createAsyncThunk<Fullname, string, ThunkApiConfig>(
    "profile/fullname",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get<Fullname>(`http://localhost:8088/profile/fullname/get/${userId}`);
            return response.data;
        } catch (error) {
            logger.error(error);
            return rejectWithValue("Failed to fetch profile fullname.");
        }
    }
);

interface InitialState {
    data: Fullname | null;
}

const initialState: InitialState = {
    data: null,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(profileFullname.fulfilled, (state, action: PayloadAction<Fullname>) => {
                state.data = action.payload;
            })
    },
});

export default profileSlice.reducer;
