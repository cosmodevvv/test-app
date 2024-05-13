import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchUsers } from '@/store/reducers/user/UserService';
import { IUser } from '@/models/IUser';
import { userSlice } from '@/store/reducers/user/UserSlice';
import UsersList from '@/components/user/UsersList';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { users, isLoading, favoriteUsers } = useAppSelector(state => state.user);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    dispatch(fetchUsers({page: page + 1}));
  }, [page]);


	const onFavoritePress = (user: IUser) => {
		dispatch(userSlice.actions.setFavoriteUsers(user))
	}

	const onRefresh = () => {
		dispatch(fetchUsers({page: 1}))
		setPage(1)
	}
  return (
		<UsersList
			users={users}
			isLoading={isLoading}
			favoriteUsers={favoriteUsers}
			setPage={() => setPage(page + 1)}
			isPaginated
			isRefreshing
			onRefresh={onRefresh}
			onFavoritePress={(user) => onFavoritePress(user)}
		/>
  );
}

