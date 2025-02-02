import { IUser } from '../../types/IUser.ts';
import { FC } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { USER_ROUTE } from '../../routes/constants.ts';

interface IProps {
    user: IUser;
}

const UsersListItem: FC<IProps> = ({ user }) => {
    return (
        <Link to={generatePath(USER_ROUTE, { userId: String(user.id) })}>
            <div className="bg-white shadow-lg hover:shadow-xl rounded-[8px] p-6 flex gap-4 items-center">
                <div className="shrink-0">
                    <img className="w-15 h-15" src={user.image} alt="logo" />
                </div>
                <div>
                    <h2 className="font-bold text-[20px]">
                        {user.firstName} {user.lastName}
                    </h2>
                    <div className="text-gray-500 font-semibold">@{user.username}</div>
                    <div className="text-gray-500">{user.email}</div>
                </div>
            </div>
        </Link>
    );
};

export default UsersListItem;
