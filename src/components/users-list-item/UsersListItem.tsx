import { IUser } from '../../types/IUser.ts';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    user: IUser;
}

const UsersListItem: FC<IProps> = ({ user }) => {
    return (
        <div>
            <div>
                <Link to={`/users/${user.id}`}>
                    {user.id}. {user.firstName} {user.lastName}
                </Link>
            </div>
        </div>
    );
};

export default UsersListItem;
