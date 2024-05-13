import { IUser } from '@/models/IUser'
import { AntDesign } from '@expo/vector-icons'
import React, { FC } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
interface UserItemProps {
	user: IUser,
	onPress: () => void
	isFavorite?: boolean
}
const UserItem: FC<UserItemProps>= ({ user, onPress, isFavorite }) => {

	const userDOB = new Date(user.dob.date)
	return (
		<View style={styles.userCard}>
			<View style={styles.userData}>
				<Image source={{ uri: user.picture.thumbnail }} style={styles.userAvatar} />
				<View>
					<Text style={styles.username}>{user.name.first}</Text>
					<View style={styles.userLocation}>
						<EvilIcons name="location" size={18} color="#4d4d4d" />
						<Text style={styles.userLocationText}>{user.location.country}, {user.location.city}</Text>
					</View>
					<Text style={styles.userDOB}>{user.dob.age}, {userDOB.toDateString()}</Text>
				</View>
			</View>
			<TouchableOpacity onPress={onPress}>
				<AntDesign name={isFavorite ? 'star' : 'staro'} size={24} color="#ff0080" />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	userCard: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		display: 'flex',
		paddingLeft: 1,
		paddingRight: 30,
		flexDirection: 'row',
		width: '100%',
		marginTop: 10,
		backgroundColor: 'white',
		borderRadius: 10,
		paddingTop: 10,
		paddingBottom: 10,
	},
	username: {
		fontSize: 18,
	},
	userDOB: {
		color: '#4d4d4d',
		marginTop: 8,
	},
	userLocation: {
		marginTop: 8,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	userLocationText: {
		color: '#4d4d4d',
	},
	userAvatar: {
		width: 50,
		height: 50,
		borderRadius: 50,
		transform: [{translateX: -20}],
		borderWidth: 2,
    borderColor: 'white',
	},
	userData: {
		display: 'flex',
		gap: 5,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
	}
})

export default UserItem