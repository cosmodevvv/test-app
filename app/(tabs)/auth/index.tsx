import React, { useEffect, useRef } from "react";
import { TextInput, StyleSheet, View, Button, Text, TouchableOpacity, Animated, Easing } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { authValidationSchema, authValidationValues } from "@/validations/AuthValidation";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { login } from "@/store/reducers/auth/AuthService";
import { useNavigation } from "expo-router";

export default function AuthScreen() {

	const dispatch = useAppDispatch()
	const { error, isAuth } = useAppSelector(state => state.auth)

	const navigation = useNavigation()

	const { handleSubmit, control, formState: { errors } } = useForm<authValidationValues>({
		resolver: zodResolver(authValidationSchema)
	})


	const animationValue = useRef(new Animated.Value(1)).current;

	const onSubmit = (data: authValidationValues) => {
		dispatch(login(data.email, data.password));
	};

	const isEnyError = error !== '' || errors.email?.message?.length || errors.password?.message?.length

	const handlePress = () => {
				shakeAnimation();
				handleSubmit(onSubmit)();	
	};

	const shakeAnimation = () => {
			Animated.sequence([
				Animated.timing(animationValue, {
					toValue: -10,
					duration: 70,
					useNativeDriver: true,
					easing: Easing.linear
				}),
				Animated.timing(animationValue, {
					toValue: 20,
					duration: 70,
					useNativeDriver: true,
					easing: Easing.linear
				}),
				Animated.timing(animationValue, {
					toValue: 0,
					duration: 70,
					useNativeDriver: true,
					easing: Easing.linear
				})
			]).start();
	};


  return (
		<View style={styles.container}>
			<View style={styles.inputBox}>
				<Controller
					name='email'
					control={control}
					render={({field}) => (
						<TextInput 
							style={styles.inputStyle}
							placeholder="email"
							value={field.value}
							onChangeText={field.onChange}
						/>
					)}
				/>
				{errors.email && (
					<Text style={styles.error}>{errors.email.message}</Text>
				)}	
			</View>
		
		<View style={styles.inputBox}>
			<Controller
				name='password'
				control={control}
				render={({field}) => (
					<TextInput 
						secureTextEntry
						textContentType="password"
						style={styles.inputStyle}
						placeholder="password"
						value={field.value}
						onChangeText={field.onChange}
					/>
				)}
			/>
			{errors.password && (
				<Text style={styles.error}>{errors.password.message}</Text>
			)}	
		</View>
		<TouchableOpacity
				style={[styles.buttonStyle, { backgroundColor: isEnyError ? 'red' : 'green', transform: [{ translateX: animationValue}] }]}
				onPress={handlePress}
				activeOpacity={1}
			>
				<Text style={{ color: 'white' }}>Submit</Text>
			</TouchableOpacity>
			<Text style={styles.error}>{error}</Text>
		</View>
  );
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		gap: 30,
		padding: 20,
	},
	buttonStyle: {
		padding: 10,
		paddingHorizontal: 40,
		color: 'white',
		borderRadius: 5,
	},
	inputBox: {
		width: '90%',
	},
	inputStyle: {
		width: '100%',
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 5,
		padding: 5,
	},
	error: {
		color: 'red',
		marginTop: 10,
		marginBottom: 5,
	},
});
