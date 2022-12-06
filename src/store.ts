import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import CounterReducer from './features/counter/CounterSlice'
import AuthReducer from './features/auth/AuthSlice'

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    auth: AuthReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
