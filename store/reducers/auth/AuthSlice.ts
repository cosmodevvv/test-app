import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
	isAuth: boolean
	error: string
}

const initialState: AuthState = {
	isAuth: false,
	error: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
		setIsAuth: (state, action: PayloadAction<boolean>) => {
			state.error = ''
			state.isAuth = action.payload
		},
		setError: (state, action: PayloadAction<string>) => {
			state.isAuth = false
			state.error = action.payload
		}
  },
})

export default authSlice.reducer