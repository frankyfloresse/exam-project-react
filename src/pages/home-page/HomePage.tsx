import HomeGreetingGuest from '../../components/home-greeting/HomeGreetingGuest.tsx';
import HomeGreetingUser from '../../components/home-greeting/HomeGreetingUser.tsx';
import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';

const HomePage = () => {
    const { authUser } = useAppSelector(({ authSlice }) => authSlice);

    return (
        <div className="full-height flex flex-col items-center justify-center">
            {authUser ? <HomeGreetingUser /> : <HomeGreetingGuest />}
        </div>
    );
};

export default HomePage;
