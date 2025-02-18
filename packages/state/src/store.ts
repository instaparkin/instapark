import { configureStore } from '@reduxjs/toolkit'
import mapsReducer from "./slices/maps-slice"
import profileReducer from "../src/slices/profile-slice"

export const store = configureStore({
  reducer: {
    maps: mapsReducer,
    profile: profileReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch