import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';
import { useEffect } from 'react';
import { usersSliceActions } from '../../redux/slices/usersSlice.ts';
import { useAppDispatch } from '../../redux/hooks/useAppDispatch.ts';
import UsersListItem from '../users-list-item/UsersListItem.tsx';

const UsersList = () => {
    const { users, skip, searchText, isLoading } = useAppSelector(({ usersSlice }) => usersSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(usersSliceActions.loadUsers());
    }, [skip, searchText]);

    if (isLoading) {
        return <div className="text-2xl font-bold text-center my-10">Loading...</div>;
    }

    return (
        <div className="grid grid-cols-3 gap-6 w-full my-5">
            {users.map((user) => (
                <UsersListItem key={user.id} user={user} />
            ))}
        </div>
    );
};

export default UsersList;
