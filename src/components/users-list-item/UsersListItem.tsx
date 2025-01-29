import { IUser } from '../../types/IUser.ts';
import { FC } from 'react';

interface IProps {
    user: IUser;
}

const UsersListItem: FC<IProps> = ({ user }) => {
    return (
        <div>
            <div>
                {user.id}. {user.firstName} {user.lastName}
            </div>
        </div>
    );
};

export default UsersListItem;
