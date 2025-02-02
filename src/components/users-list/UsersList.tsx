import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';
import UsersListItem from '../users-list-item/UsersListItem.tsx';

const UsersList = () => {
    const { users } = useAppSelector(({ usersSlice }) => usersSlice);

    return (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 w-full my-5">
            {users.map((user) => (
                <UsersListItem key={user.id} user={user} />
            ))}
        </div>
    );
};

export default UsersList;
