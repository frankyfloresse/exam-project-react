import { Link } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../routes/constants.ts';

const HomeGreetingGuest = () => {
    return (
        <div className="flex flex-col text-center max-w-[620px] gap-6">
            <h1 className="text-[45px] font-bold">Welcome to Recipe App</h1>
            <p className="text-gray-500 text-[18px]">
                Discover and share amazing recipes with our community. Join us to access our collection of recipes and
                connect with other food enthusiasts.
            </p>
            <Link
                to={LOGIN_ROUTE}
                className="py-3 px-4.5 rounded-[6px] bg-indigo-600 hover:bg-indigo-700 text-white mx-auto">
                Get Started
            </Link>
        </div>
    );
};

export default HomeGreetingGuest;
