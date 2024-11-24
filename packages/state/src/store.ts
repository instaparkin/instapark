import { configureStore } from '@reduxjs/toolkit'
import searchSpaceReducer from './slices/search-space'
import userReducer from "./slices/user-slice"

export const store = configureStore({
  reducer: {
    maps: searchSpaceReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch