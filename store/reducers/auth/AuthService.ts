import { AppDispatch } from "@/store/store";
import { authSlice } from "./AuthSlice";

export const login = (email: string, password: string) => ( dispatch: AppDispatch) => {
	const isPasswordMatch = password === process.env.EXPO_PUBLIC_PASSWORD
	const isEmailMatch = email === process.env.EXPO_PUBLIC_EMAIL
	if (isEmailMatch && isPasswordMatch) {
		dispatch(authSlice.actions.setIsAuth(true))
	} else {
		dispatch(authSlice.actions.setError('Invalid email or password'))
	}
}