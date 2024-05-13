import { IUser } from '@/models/IUser'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchUsers } from './UserService'

export interface UserState {
	isLoading: boolean
	error: string
	users: IUser[]
	favoriteUsers: IUser[]
}

const initialState: UserState = {
	isLoading: false,
	error: '',
	users: [],
	favoriteUsers: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
		setFavoriteUsers: (state, action: PayloadAction<IUser>) => {
			const isExistingFavorite = state.favoriteUsers.some((user) => user.email === action.payload.email)

			if (!isExistingFavorite) {
				state.favoriteUsers = [...state.favoriteUsers, action.payload]
			} else {
				state.favoriteUsers = state.favoriteUsers.filter((user) => user.email !== action.payload.email)
			}
		},
		setUsers: (state, action: PayloadAction<IUser[]>) => {
			state.isLoading = false
			state.error = ''
			state.users = action.payload
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<{users: IUser[], page: number}>) => {
			if (action.payload.page !== 1) {
				state.isLoading = false
				state.error = ''
				state.users = [...state.users, ...action.payload.users]
			}
		})

		builder.addCase(fetchUsers.pending, (state) => {
			state.isLoading = true
		})

		builder.addCase(fetchUsers.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.error.message as string
		})
	}
})

export default userSlice.reducer