import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchUsers } from '@/store/reducers/user/UserService';
import { IUser } from '@/models/IUser';
import { userSlice } from '@/store/reducers/user/UserSlice';
import UsersList from '@/components/user/UsersList';

const favorite = () => {
  const dispatch = useAppDispatch();
  const { isLoading, favoriteUsers } = useAppSelector(state => state.user);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    dispatch(fetchUsers({page: page + 1}));
  }, [page]);

	const onFavoritePress = (user: IUser) => {
		dispatch(userSlice.actions.setFavoriteUsers(user))
	}

  return (
		<UsersList
			users={favoriteUsers}
			isLoading={isLoading}
			isPaginated={false}
			isRefreshing={false}
			favoriteUsers={favoriteUsers}
			setPage={() => setPage(page + 1)}
			onFavoritePress={(user) => onFavoritePress(user)}
			noUsersText="No favorite users"
		/>
  );
}

export default favorite