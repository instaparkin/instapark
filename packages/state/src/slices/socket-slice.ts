import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface InitialState {
    socket: Socket | null;
}

const initialState: InitialState = {
    socket: null,
};

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setSocket: (state, action: PayloadAction<Socket>) => {
            state.socket = action.payload
        },
    },
});

export const { setSocket } = socketSlice.actions; // Export the action for dispatching
export default socketSlice.reducer; // Export the reducer for store configuration
