import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';
import { useEffect } from 'react';
import { usersSliceActions } from '../../redux/slices/usersSlice.ts';
import { useAppDispatch } from '../../redux/hooks/useAppDispatch.ts';
import UsersListItem from '../users-list-item/UsersListItem.tsx';

const UsersList = () => {
    const { users } = useAppSelector(({ usersSlice }) => usersSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(usersSliceActions.loadUsers());
    }, []);

    return (
        <div>
            {users.map((user) => (
                <UsersListItem key={user.id} user={user} />
            ))}
        </div>
    );
};

export default UsersList;
