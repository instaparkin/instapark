import { configureStore } from '@reduxjs/toolkit'
import searchSpaceReducer from './slices/search-space'

export const store = configureStore({
  reducer: {
    maps: searchSpaceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch