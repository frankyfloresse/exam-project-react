import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';

const Menu = () => {
    const { authUser } = useAppSelector(({ authSlice }) => authSlice);

    const logout = () => {
        localStorage.removeItem('user');
        location.href = '/';
    };

    return (
        <nav className="flex items-center justify-between px-15 py-4 shadow-md bg-white">
            <Link to={'/'} className="text-lg font-bold text-indigo-600">
                Recipe App
            </Link>

            <ul className="flex items-center space-x-6">
                {authUser ? (
                    <>
                        <li>
                            <Link to={'/recipes'} className="text-gray-700 hover:text-indigo-600">
                                Recipes
                            </Link>
                        </li>
                        <li>
                            <Link to={'/users'} className="text-gray-700 hover:text-indigo-600">
                                Users
                            </Link>
                        </li>
                        <li className="flex items-center space-x-2">
                            <img
                                src={authUser.image}
                                alt="logo"
                                className="w-8 h-8 rounded-full border-2 border-indigo-600"
                            />
                            <span className="text-gray-700">{authUser.username}</span>
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
                            to={'/login'}
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
