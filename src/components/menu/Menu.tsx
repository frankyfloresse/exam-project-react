import { generatePath, Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';
import { AUTH_USER_KEY } from '../../constants/localStorageKeys.ts';
import { BASE_ROUTE, LOGIN_ROUTE, RECIPES_ROUTE, USER_ROUTE, USERS_ROUTE } from '../../routes/constants.ts';

const Menu = () => {
    const { authUser } = useAppSelector(({ authSlice }) => authSlice);

    const logout = () => {
        localStorage.removeItem(AUTH_USER_KEY);
        location.href = '/';
    };

    return (
        <nav className="flex items-center justify-between px-15 py-4 shadow-md bg-white">
            <Link to={BASE_ROUTE} className="text-lg font-bold text-indigo-600">
                Recipe App
            </Link>

            <ul className="flex items-center space-x-6">
                {authUser ? (
                    <>
                        <li>
                            <Link to={RECIPES_ROUTE} className="text-gray-700 hover:text-indigo-600">
                                Recipes
                            </Link>
                        </li>
                        <li>
                            <Link to={USERS_ROUTE} className="text-gray-700 hover:text-indigo-600">
                                Users
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="flex items-center space-x-2"
                                to={generatePath(USER_ROUTE, { userId: String(authUser.id) })}>
                                <img
                                    src={authUser.image}
                                    alt="logo"
                                    className="w-8 h-8 rounded-full border-2 border-indigo-600"
                                />
                                <span className="text-gray-700">{authUser.username}</span>
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={logout}
                                className="text-red-500 hover:text-red-700 font-bold cursor-pointer">
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link
                            to={LOGIN_ROUTE}
                            className="py-2 px-4.5 rounded-[6px] bg-indigo-600 hover:bg-indigo-700 text-white">
                            Login
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Menu;
