import UserCard from '../../components/user-card/UserCard.tsx';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';
import { useAppDispatch } from '../../redux/hooks/useAppDispatch.ts';
import { useEffect } from 'react';
import { userSliceActions } from '../../redux/slices/userSlice.ts';
import SpinnerLoader from '../../components/spinner-loader/SpinnerLoader.tsx';

const UserPage = () => {
    const { userId } = useParams();

    const { isLoading, isRecipesLoading } = useAppSelector(({ userSlice }) => userSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!userId) {
            return;
        }

        dispatch(userSliceActions.loadUser(userId));
        dispatch(userSliceActions.loadUserRecipes(userId));

        return () => {
            dispatch(userSliceActions.resetState());
        };
    }, []);

    if (isLoading || isRecipesLoading) {
        return <SpinnerLoader />;
    }

    return <UserCard />;
};

export default UserPage;
