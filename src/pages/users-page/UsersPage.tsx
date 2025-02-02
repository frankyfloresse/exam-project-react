import UsersList from '../../components/users-list/UsersList.tsx';
import { usersSliceActions } from '../../redux/slices/usersSlice.ts';
import { generatePath, useNavigate } from 'react-router-dom';
import { USER_ROUTE } from '../../routes/constants.ts';
import SearchBar from '../../components/search-bar/SearchBar.tsx';
import Pagination from '../../components/pagination/Pagination.tsx';
import SpinnerLoader from '../../components/spinner-loader/SpinnerLoader.tsx';
import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';
import { useAppDispatch } from '../../redux/hooks/useAppDispatch.ts';
import { useEffect } from 'react';

const UsersPage = () => {
    const navigate = useNavigate();
    const { skip, limit, total, searchText, isLoading } = useAppSelector(({ usersSlice }) => usersSlice);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(usersSliceActions.loadUsers());
    }, [skip, searchText]);

    if (isLoading) {
        return <SpinnerLoader />;
    }

    return (
        <div className="flex flex-col items-center container mx-auto mt-5">
            <h1 className="text-[28px] font-bold mb-3">Users</h1>

            <SearchBar
                onTextSearch={(text) => dispatch(usersSliceActions.setSearchText(text))}
                onIdSearch={(userId) => navigate(generatePath(USER_ROUTE, { userId }))}
                placeholder={'Search users...'}
                initialSearch={searchText}
            />

            <UsersList />

            <Pagination
                skip={skip}
                total={total}
                limit={limit}
                onSkipChange={(newSkip) => dispatch(usersSliceActions.setSkip(newSkip))}
            />
        </div>
    );
};

export default UsersPage;
