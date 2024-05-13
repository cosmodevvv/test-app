import { IUser } from '@/models/IUser'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { userSlice } from './UserSlice'

export const fetchUsers = createAsyncThunk('user/all', async (data: {page: number}, thunkAPI) => {

	const response = await axios.get<{ results: IUser[] }>(`https://randomuser.me/api/?page=${data.page}&results=15`)

	if (data.page === 1 && response.data.results.length !== 0) {
		thunkAPI.dispatch(userSlice.actions.setUsers(response.data.results))
	}
	return { users: response.data.results, page: data.page }
})