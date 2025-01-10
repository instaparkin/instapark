import { configureStore } from '@reduxjs/toolkit'
import mapsReducer from "./slices/maps-slice"
import searchReducer from "./slices/search-slice";
import profileReducer from "../src/slices/profile-slice"

export const store = configureStore({
  reducer: {
    maps: mapsReducer,
    search: searchReducer,
    profile: profileReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch