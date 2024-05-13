import { configureStore} from '@reduxjs/toolkit'
import  authSlice from './reducers/auth/AuthSlice'
import userSlice from './reducers/user/UserSlice'
export const store = configureStore({
  reducer: {
		auth: authSlice,
		user: userSlice
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch