import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';
import UserRecipesList from '../user-recipes-list/UserRecipesList.tsx';

const UserCard = () => {
    const { user, recipes } = useAppSelector(({ userSlice }) => userSlice);

    if (!user) {
        return (
            <div className="full-height flex flex-col items-center justify-center text-2xl font-bold">
                User not found
            </div>
        );
    }

    return (
        <div className="max-w-[800px] mx-auto mt-10">
            <div className="flex gap-8 bg-white shadow-lg rounded-2xl p-6">
                <div className="shrink-0">
                    <img className="w-25 h-25" width="100" height="100" src={user.image} alt="logo" />
                </div>

                <div>
                    <div>
                        <h2 className="text-xl font-semibold">
                            {user.firstName} {user.lastName}
                        </h2>
                        <div className="text-gray-500">@{user.username}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-3">
                        <div>
                            <h3 className="font-semibold text-gray-500">Contact Information</h3>
                            <p>Email: {user.email}</p>
                            <p>Phone: {user.phone}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-500">Personal Information</h3>
                            <p>Age: {user.age}</p>
                            <p>Gender: {user.gender}</p>
                            <p>Birth Date: {user.birthDate}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-500">Address</h3>
                            <p>{user.address.address}</p>
                            <p>
                                {user.address.city}, {user.address.state}
                            </p>
                            <p>{user.address.postalCode}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-500">Company</h3>
                            <p>{user.company.name}</p>
                            <p>{user.company.title}</p>
                            <p>{user.company.department}</p>
                        </div>
                    </div>
                </div>
            </div>
            <UserRecipesList recipes={recipes} />
        </div>
    );
};

export default UserCard;
