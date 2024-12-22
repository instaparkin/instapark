import { configureStore } from '@reduxjs/toolkit'
import mapsReducer from "./slices/maps-slice"

export const store = configureStore({
  reducer: {
    maps: mapsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch