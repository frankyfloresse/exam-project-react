import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';
import { useEffect } from 'react';
import { usersSliceActions } from '../../redux/slices/usersSlice.ts';
import { useAppDispatch } from '../../redux/hooks/useAppDispatch.ts';
import UsersListItem from '../users-list-item/UsersListItem.tsx';
import Pagination from '../pagination/Pagination.tsx';

const UsersList = () => {
    const { users, skip, limit, total } = useAppSelector(({ usersSlice }) => usersSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(usersSliceActions.loadUsers());
    }, [skip]);

    return (
        <div>
            {users.map((user) => (
                <UsersListItem key={user.id} user={user} />
            ))}
            <Pagination
                skip={skip}
                total={total}
                limit={limit}
                onSkipChange={(newSkip) => dispatch(usersSliceActions.setSkip(newSkip))}
            />
        </div>
    );
};

export default UsersList;
