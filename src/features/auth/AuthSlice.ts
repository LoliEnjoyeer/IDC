import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  value: String
}

const initialState: AuthState = {
  value: "",
}

export const AuthSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setUser: (state, action: PayloadAction<String>) => {
      state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser} = AuthSlice.actions

export default AuthSlice.reducer
