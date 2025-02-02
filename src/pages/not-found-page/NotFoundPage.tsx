import { Link } from 'react-router-dom';
import susCat from '../../assets/images/sus-cat.png';
import { BASE_ROUTE } from '../../routes/constants.ts';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="bg-white shadow-lg rounded-2xl p-6 text-center flex flex-col">
                <img className="size-[350px]" src={susCat} alt="sus cat" />
                <h1 className="text-[30px] font-bold mt-3">Why are you here?</h1>
                <p>You're not supposed to be here.</p>
                <Link to={BASE_ROUTE} className="mt-5 text-blue-500 hover:underline text-[18px]">
                    Go home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
