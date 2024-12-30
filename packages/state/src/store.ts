import { configureStore } from '@reduxjs/toolkit'
import mapsReducer from "./slices/maps-slice"
import searchReducer from "./slices/search-slice";

export const store = configureStore({
  reducer: {
    maps: mapsReducer,
    search: searchReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch