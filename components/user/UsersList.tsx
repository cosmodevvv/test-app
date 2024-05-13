import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { IUser } from '@/models/IUser';
import { fetchUsers } from '@/store/reducers/user/UserService';
import { userSlice } from '@/store/reducers/user/UserSlice';
import React, { useEffect } from 'react'
import { View, ActivityIndicator, FlatList, StyleSheet, RefreshControl, Text } from 'react-native';
import UserItem from './UserItem';

interface IProps {
	users: IUser[]
	isLoading: boolean
	favoriteUsers: IUser[]
	setPage: () => void
	onFavoritePress: (user: IUser) => void
	isPaginated?: boolean
	onRefresh?: () => void
	isRefreshing?: boolean
	noUsersText?: string
}
const UsersList: React.FC<IProps> = ({ users, isLoading, favoriteUsers, setPage, onFavoritePress, isPaginated, onRefresh, isRefreshing, noUsersText }) => {

  const renderUserItem = ({ item } : { item: IUser }) => {

		const isFavorite = favoriteUsers.some((user) => user.email === item.email)

    return (
			<View style={styles.userItem}>
      	<UserItem isFavorite={isFavorite} onPress={() => onFavoritePress(item)} user={item} />
    	</View>
		)
	};

  const renderLoader = () => (
    isLoading && isPaginated ? <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} /> : null
  );

	const onEndReached = () => {
		if (users.length > 10 && isPaginated) {
			setPage()
		}
	}

	if (!users.length) {
		return (
			<View style={styles.noUsersContainer}>
					<Text style={styles.noUsersText}>{noUsersText}</Text>
			</View>
		)
	}
  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
					refreshControl={
						isRefreshing ? (
							<RefreshControl
								refreshing={isLoading}
								onRefresh={onRefresh}
							/>
						) : undefined
					}
          data={users}
          renderItem={renderUserItem}
          keyExtractor={item => item.email}
          contentContainerStyle={styles.flatListContent}
          onEndReached={onEndReached}
          ListFooterComponent={renderLoader}
          onEndReachedThreshold={0.5} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    alignItems: 'center',
  },
	noUsersContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%'
	},
	noUsersText: {
		fontSize: 20,
		color: '#4d4d4d',
	},
  flatListContainer: {
    width: '95%',
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    marginTop: 10,
    overflow: 'hidden',
		height: '100%',
  },
  flatListContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  userItem: {
    width: '90%',
    marginTop: 10
  }
});
export default UsersList