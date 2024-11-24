import { Role } from "@instapark/types";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    currentRole: Role
    roles: Role[]
}

const initialState: InitialState = {
    currentRole: "Buyer",
    roles: ["Buyer", "Seller"]
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrentRole: (state, action: { payload: Role }) => {
            state.currentRole = action.payload
        }
    }
})

export const { setCurrentRole } = userSlice.actions;
export default userSlice.reducer;