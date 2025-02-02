import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';
import { RECIPES_ROUTE, USERS_ROUTE } from '../../routes/constants.ts';
import ArrowButton from '../arrow-button/ArrowButton.tsx';

const HomeGreetingUser = () => {
    const { authUser } = useAppSelector(({ authSlice }) => authSlice);

    return (
        <div className="flex flex-col text-center max-w-[620px] gap-6">
            <h1 className="text-[45px] font-bold">Welcome to Recipe App</h1>
            <p className="text-gray-500 text-[18px]">
                Hello, <span className="text-indigo-500 font-bold text-[20px]">{authUser?.firstName}</span>! What would
                you like to explore today?
            </p>
            <div className="flex justify-center gap-6">
                <Link to={RECIPES_ROUTE}>
                    <ArrowButton text={'View Recipes'} />
                </Link>
                <Link to={USERS_ROUTE}>
                    <ArrowButton text={'View Users'} />
                </Link>
            </div>
        </div>
    );
};

export default HomeGreetingUser;
