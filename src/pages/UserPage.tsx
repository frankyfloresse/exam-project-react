import UserCard from '../components/user-card/UserCard.tsx';
import { useParams } from 'react-router-dom';

const UserPage = () => {
    const { userId } = useParams();
    return <div>{userId && <UserCard userId={userId} />}</div>;
};

export default UserPage;
