import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';
import { useEffect } from 'react';
import { usersSliceActions } from '../../redux/slices/usersSlice.ts';
import { useAppDispatch } from '../../redux/hooks/useAppDispatch.ts';
import UsersListItem from '../users-list-item/UsersListItem.tsx';
import Pagination from '../pagination/Pagination.tsx';
import SearchBar from '../search-bar/SearchBar.tsx';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
    const navigate = useNavigate();
    const { users, skip, limit, total, searchText } = useAppSelector(({ usersSlice }) => usersSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(usersSliceActions.loadUsers());
    }, [skip, searchText]);

    return (
        <div className="flex flex-col items-center container mx-auto mt-5">
            <h1 className="text-[28px] font-bold mb-3">Users</h1>

            <SearchBar
                onTextSearch={(text) => dispatch(usersSliceActions.setSearchText(text))}
                onIdSearch={(userId) => navigate(`/users/${userId}`)}
                placeholder={'Search users...'}
            />

            <div className="grid grid-cols-3 gap-6 w-full my-5">
                {users.map((user) => (
                    <UsersListItem key={user.id} user={user} />
                ))}
            </div>

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
