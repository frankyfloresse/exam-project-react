import { FC, useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';
import { useAppDispatch } from '../../redux/hooks/useAppDispatch.ts';
import { userSliceActions } from '../../redux/slices/userSlice.ts';

interface IProps {
    userId: string;
}

const UserCard: FC<IProps> = ({ userId }) => {
    const { user } = useAppSelector(({ userSlice }) => userSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userSliceActions.loadUser(userId));
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>{user.username}</div>
        </div>
    );
};

export default UserCard;
